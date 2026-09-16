// ============================================================================
// AI Agent — client library (Railway migration)
//
// One unified, human-supervised agent with three capabilities:
//   1. SEO & growth analysis   (real on-page scans of this site's own routes)
//   2. Website visitor/customer chat support (the floating ChatWidget)
//   3. Contact-form lead reply drafting (never auto-sent)
//
// Every exported name/signature here is unchanged from the old Firestore
// version, so src/components/AgentControlCenter.tsx and
// src/components/ChatWidget.tsx need no changes at all — only the
// implementation moved from direct Firestore reads/writes to fetch() calls
// against the new Express + PostgreSQL backend (server/routes/agent.js).
//
// Ground rules enforced throughout this file (unchanged):
// - Every admin write goes through requireAdmin on the server — the exact
//   same allowlist Firebase Auth used to enforce, just JWT-based now.
// - Nothing here ever contacts a lead, publishes a change, or performs a
//   bulk operation. Findings and drafts are proposals; a status only moves
//   to "approved" / "marked_sent" when the signed-in owner clicks the
//   button in the Admin Control Center.
// - Every finding and draft carries a data_source / evidence string. If a
//   data source is not actually connected (e.g. Search Console), it is
//   reported as unverified — never invented.
// - Every agent action and every human decision is appended to
//   agent_action_log server-side (append-only) so recommendations stay
//   auditable.
// ============================================================================

import { adminFetch, publicFetch } from './api';
import { sanitizeText } from './sanitize';
import {
  AgentFinding,
  AgentFindingStatus,
  AgentLeadDraft,
  AgentDraftStatus,
  AgentActionLogEntry,
  AgentChatMessage,
  ProjectLead,
  ServiceRecord,
} from '../types';

// ----------------------------------------------------------------------------
// Audit log (append-only, written server-side by the routes below)
// ----------------------------------------------------------------------------

export async function fetchActionLog(): Promise<AgentActionLogEntry[]> {
  try {
    const res = await adminFetch('/api/agent/action-log');
    if (res.ok) return (await res.json()) as AgentActionLogEntry[];
  } catch (err) {
    console.warn('[Agent] Fetch action log failed:', err);
  }
  return [];
}

// ----------------------------------------------------------------------------
// Capability 1: SEO & growth analysis
// ----------------------------------------------------------------------------

export interface SeoScanResponse {
  scanned_at: string;
  base_url: string;
  paths_scanned: string[];
  findings: Omit<AgentFinding, 'id' | 'run_id' | 'status' | 'reviewed_by' | 'reviewed_at' | 'created_at'>[];
  integration_status: Record<string, { connected: boolean; reason: string }>;
}

/**
 * Triggers a real scan of this site's own live pages (owner-initiated only —
 * this is never run automatically or on a schedule). Calls
 * POST /api/agent/seo-scan on the backend, which fetches each route over
 * HTTP and inspects the actual response. Returns the raw scan result; call
 * persistSeoFindings() to save it after the owner has seen it.
 */
export async function runSeoScan(baseUrl: string, paths?: string[]): Promise<SeoScanResponse> {
  const res = await adminFetch('/api/agent/seo-scan', {
    method: 'POST',
    body: JSON.stringify({ baseUrl, paths }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'SEO scan failed.');
  }
  return data as SeoScanResponse;
}

/**
 * Persists a completed scan's findings as status "new" (i.e. awaiting owner
 * review) and writes one audit-log entry for the run — both done server-side
 * by POST /api/agent/findings.
 */
export async function persistSeoFindings(scan: SeoScanResponse): Promise<AgentFinding[]> {
  const res = await adminFetch('/api/agent/findings', {
    method: 'POST',
    body: JSON.stringify({
      findings: scan.findings,
      base_url: scan.base_url,
      paths_scanned: scan.paths_scanned,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.warn('[Agent] Persist findings failed:', data?.error);
    return [];
  }
  return (data.data || []) as AgentFinding[];
}

export async function fetchAgentFindings(): Promise<AgentFinding[]> {
  try {
    const res = await adminFetch('/api/agent/findings');
    if (res.ok) return (await res.json()) as AgentFinding[];
  } catch (err) {
    console.warn('[Agent] Fetch findings failed:', err);
  }
  return [];
}

/**
 * The ONLY way a finding's status changes from "new". Always an explicit
 * owner click — never called automatically.
 */
export async function setFindingStatus(finding: AgentFinding, status: AgentFindingStatus): Promise<boolean> {
  try {
    const res = await adminFetch(`/api/agent/findings/${encodeURIComponent(finding.id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch (err) {
    console.warn('[Agent] Set finding status failed:', err);
    return false;
  }
}

// ----------------------------------------------------------------------------
// Capability 2: chat widget transcripts (evidence for "handles real
// customer messages" — written directly by the public-facing ChatWidget)
// ----------------------------------------------------------------------------

export async function logChatMessages(
  sessionId: string,
  provider: 'claude' | 'gemini',
  messages: AgentChatMessage[],
  pageUrl: string
): Promise<void> {
  try {
    await publicFetch('/api/agent/chat-sessions', {
      method: 'POST',
      body: JSON.stringify({
        id: sessionId,
        provider,
        messages: messages.slice(-40),
        page_url: sanitizeText(pageUrl).slice(0, 300),
      }),
    });
  } catch (err) {
    // Never let transcript logging break the visitor's chat experience.
    console.warn('[Agent] Chat transcript log failed:', err);
  }
}

export async function fetchChatSessions() {
  try {
    const res = await adminFetch('/api/agent/chat-sessions');
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[Agent] Fetch chat sessions failed:', err);
  }
  return [];
}

// ----------------------------------------------------------------------------
// Capability 3: contact-form lead reply drafts
// ----------------------------------------------------------------------------

/**
 * Calls POST /api/agent/lead-draft with the REAL lead record and REAL
 * published services (both passed in by the caller from data already
 * loaded). Returns the drafted text; does not save or send anything.
 */
export async function generateLeadDraft(
  lead: ProjectLead,
  services: ServiceRecord[]
): Promise<{ draft_message: string; evidence: string; model_used: string }> {
  const res = await adminFetch('/api/agent/lead-draft', {
    method: 'POST',
    body: JSON.stringify({ lead, services }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Drafting failed.');
  }
  return data;
}

/**
 * Saves a drafted reply as status "draft" (awaiting owner review). Nothing
 * is sent to the lead at this or any later stage of this file.
 */
export async function persistLeadDraft(
  lead: ProjectLead,
  draftMessage: string,
  evidence: string,
  modelUsed: string
): Promise<AgentLeadDraft> {
  const res = await adminFetch('/api/agent/lead-drafts', {
    method: 'POST',
    body: JSON.stringify({ lead, draft_message: draftMessage, evidence, model_used: modelUsed }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Could not save this draft.');
  }
  return data.data as AgentLeadDraft;
}

export async function fetchLeadDrafts(): Promise<AgentLeadDraft[]> {
  try {
    const res = await adminFetch('/api/agent/lead-drafts');
    if (res.ok) return (await res.json()) as AgentLeadDraft[];
  } catch (err) {
    console.warn('[Agent] Fetch lead drafts failed:', err);
  }
  return [];
}

/**
 * Moves a draft between draft/approved/rejected/marked_sent. "marked_sent"
 * is bookkeeping only — the owner sends the message themselves (e.g. from
 * their own email client) and then marks it here; this function never
 * transmits anything to the lead.
 */
export async function setDraftStatus(draftDoc: AgentLeadDraft, status: AgentDraftStatus): Promise<boolean> {
  try {
    const res = await adminFetch(`/api/agent/lead-drafts/${encodeURIComponent(draftDoc.id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch (err) {
    console.warn('[Agent] Set draft status failed:', err);
    return false;
  }
}
