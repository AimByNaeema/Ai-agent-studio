// ============================================================================
// AI Agent — client library
//
// One unified, human-supervised agent with three capabilities:
//   1. SEO & growth analysis   (real on-page scans of this site's own routes)
//   2. Website visitor/customer chat support (the floating ChatWidget)
//   3. Contact-form lead reply drafting (never auto-sent)
//
// Ground rules enforced throughout this file:
// - Every write to Firestore is gated by the same isAdmin() security rule
//   used everywhere else in this app (see firestore.rules) — there is no
//   separate, weaker path for agent data.
// - Nothing here ever contacts a lead, publishes a change, or performs a
//   bulk operation. Findings and drafts are proposals; a status only moves
//   to "approved" / "marked_sent" when the signed-in owner clicks the
//   button in the Admin Control Center.
// - Every finding and draft carries a data_source / evidence string. If a
//   data source is not actually connected (e.g. Search Console), it is
//   reported as unverified — never invented.
// - Every agent action and every human decision is appended to
//   agent_action_log (append-only — see firestore.rules) so recommendations
//   stay auditable.
// ============================================================================

import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType, sanitizeText } from './firebase';
import {
  AgentFinding,
  AgentFindingStatus,
  AgentLeadDraft,
  AgentDraftStatus,
  AgentActionLogEntry,
  AgentActionType,
  AgentChatMessage,
  ProjectLead,
  ServiceRecord,
} from '../types';

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

function currentActorEmail(): string | null {
  return auth.currentUser?.email || null;
}

// ----------------------------------------------------------------------------
// Audit log (append-only)
// ----------------------------------------------------------------------------

export async function logAgentAction(
  action: AgentActionType,
  summary: string,
  opts: { actor?: 'agent' | 'owner'; target_id?: string; evidence?: string } = {}
): Promise<void> {
  const id = newId('log');
  const entry: AgentActionLogEntry = {
    id,
    action,
    actor: opts.actor || 'owner',
    target_id: opts.target_id || null,
    summary,
    evidence: opts.evidence || null,
    created_at: new Date().toISOString(),
  };
  try {
    await setDoc(doc(db, 'agent_action_log', id), entry);
  } catch (err) {
    // Logging must never block the primary action.
    console.warn('[Agent] Failed to write action log:', err);
  }
}

export async function fetchActionLog(): Promise<AgentActionLogEntry[]> {
  try {
    const q = query(collection(db, 'agent_action_log'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as AgentActionLogEntry);
  } catch (err) {
    console.warn('[Agent] Fetch action log failed:', err);
    return [];
  }
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
 * this is never run automatically or on a schedule). Calls the /api/agent/
 * seo-scan serverless function, which fetches each route over HTTP and
 * inspects the actual response. Returns the raw scan result; call
 * persistSeoFindings() to save it after the owner has seen it.
 */
export async function runSeoScan(baseUrl: string, paths?: string[]): Promise<SeoScanResponse> {
  const res = await fetch('/api/agent/seo-scan', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ baseUrl, paths }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'SEO scan failed.');
  }
  return data as SeoScanResponse;
}

/**
 * Persists a completed scan's findings to Firestore as status "new" (i.e.
 * awaiting owner review) and writes one audit-log entry for the run.
 */
export async function persistSeoFindings(scan: SeoScanResponse): Promise<AgentFinding[]> {
  const runId = newId('run');
  const nowIso = new Date().toISOString();
  const saved: AgentFinding[] = [];

  for (const f of scan.findings) {
    const id = newId('finding');
    const record: AgentFinding = {
      id,
      run_id: runId,
      status: 'new',
      reviewed_by: null,
      reviewed_at: null,
      created_at: nowIso,
      ...f,
    };
    try {
      await setDoc(doc(db, 'agent_findings', id), record);
      saved.push(record);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `agent_findings/${id}`);
    }
  }

  await logAgentAction(
    'seo_scan_run',
    `Scanned ${scan.paths_scanned.length} route(s) of ${scan.base_url} and produced ${saved.length} finding(s).`,
    { actor: 'agent', target_id: runId, evidence: JSON.stringify(scan.integration_status) }
  );

  return saved;
}

export async function fetchAgentFindings(): Promise<AgentFinding[]> {
  try {
    const q = query(collection(db, 'agent_findings'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as AgentFinding);
  } catch (err) {
    console.warn('[Agent] Fetch findings failed:', err);
    return [];
  }
}

/**
 * The ONLY way a finding's status changes from "new". Always an explicit
 * owner click — never called automatically.
 */
export async function setFindingStatus(finding: AgentFinding, status: AgentFindingStatus): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'agent_findings', finding.id), {
      status,
      reviewed_by: currentActorEmail(),
      reviewed_at: new Date().toISOString(),
    });
    await logAgentAction(
      status === 'approved' ? 'finding_approved' : 'finding_dismissed',
      `${status === 'approved' ? 'Approved' : 'Dismissed'} finding on ${finding.page_url}: ${finding.finding}`,
      { actor: 'owner', target_id: finding.id, evidence: finding.evidence }
    );
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `agent_findings/${finding.id}`);
  }
}

// ----------------------------------------------------------------------------
// Capability 2: chat widget transcripts (evidence for "handles real customer
// messages" — written directly by the public-facing ChatWidget component)
// ----------------------------------------------------------------------------

export async function logChatMessages(
  sessionId: string,
  provider: 'claude' | 'gemini',
  messages: AgentChatMessage[],
  pageUrl: string
): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    await setDoc(
      doc(db, 'agent_chat_sessions', sessionId),
      {
        id: sessionId,
        provider,
        messages: messages.slice(-40),
        page_url: sanitizeText(pageUrl).slice(0, 300),
        started_at: nowIso,
        updated_at: nowIso,
      },
      { merge: true }
    );
  } catch (err) {
    // Never let transcript logging break the visitor's chat experience.
    console.warn('[Agent] Chat transcript log failed:', err);
  }
}

export async function fetchChatSessions() {
  try {
    const q = query(collection(db, 'agent_chat_sessions'), orderBy('updated_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data());
  } catch (err) {
    console.warn('[Agent] Fetch chat sessions failed:', err);
    return [];
  }
}

// ----------------------------------------------------------------------------
// Capability 3: contact-form lead reply drafts
// ----------------------------------------------------------------------------

/**
 * Calls /api/agent/lead-draft with the REAL lead record and REAL published
 * services (both passed in by the caller from data already loaded from
 * Firestore). Returns the drafted text; does not save or send anything.
 */
export async function generateLeadDraft(
  lead: ProjectLead,
  services: ServiceRecord[]
): Promise<{ draft_message: string; evidence: string; model_used: string }> {
  const res = await fetch('/api/agent/lead-draft', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
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
  const id = newId('draft');
  const nowIso = new Date().toISOString();
  const record: AgentLeadDraft = {
    id,
    lead_id: lead.id,
    lead_email: lead.email,
    lead_name: lead.full_name,
    draft_message: draftMessage,
    evidence,
    model_used: modelUsed,
    status: 'draft',
    reviewed_by: null,
    reviewed_at: null,
    created_at: nowIso,
  };
  try {
    await setDoc(doc(db, 'agent_lead_drafts', id), record);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `agent_lead_drafts/${id}`);
  }
  await logAgentAction('lead_draft_generated', `Drafted a reply to ${lead.full_name} (${lead.email}).`, {
    actor: 'agent',
    target_id: id,
    evidence,
  });
  return record;
}

export async function fetchLeadDrafts(): Promise<AgentLeadDraft[]> {
  try {
    const q = query(collection(db, 'agent_lead_drafts'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as AgentLeadDraft);
  } catch (err) {
    console.warn('[Agent] Fetch lead drafts failed:', err);
    return [];
  }
}

/**
 * Moves a draft between draft/approved/rejected/marked_sent. "marked_sent"
 * is bookkeeping only — the owner sends the message themselves (e.g. from
 * their own email client) and then marks it here; this function never
 * transmits anything to the lead.
 */
export async function setDraftStatus(draftDoc: AgentLeadDraft, status: AgentDraftStatus): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'agent_lead_drafts', draftDoc.id), {
      status,
      reviewed_by: currentActorEmail(),
      reviewed_at: new Date().toISOString(),
    });
    const actionMap: Record<string, AgentActionType> = {
      approved: 'lead_draft_approved',
      rejected: 'lead_draft_rejected',
      marked_sent: 'lead_draft_marked_sent',
    };
    if (actionMap[status]) {
      await logAgentAction(actionMap[status], `Marked draft for ${draftDoc.lead_name} as ${status}.`, {
        actor: 'owner',
        target_id: draftDoc.id,
      });
    }
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `agent_lead_drafts/${draftDoc.id}`);
  }
}

