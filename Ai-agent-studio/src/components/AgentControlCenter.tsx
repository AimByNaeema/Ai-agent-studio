import React, { useState, useEffect } from 'react';
import {
  Bot,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Copy,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Mail,
  Sparkles,
  History,
  Info,
} from 'lucide-react';
import {
  ProjectLead,
  ServiceRecord,
  AgentFinding,
  AgentLeadDraft,
  AgentActionLogEntry,
} from '../types';
import {
  runSeoScan,
  persistSeoFindings,
  fetchAgentFindings,
  setFindingStatus,
  generateLeadDraft,
  persistLeadDraft,
  fetchLeadDrafts,
  setDraftStatus,
  fetchActionLog,
  SeoScanResponse,
} from '../lib/agent';

// ============================================================================
// Admin Control Center for the unified AI Agent.
//
// Three sub-tabs mirror the three capabilities: SEO & Growth, Lead Drafts,
// and Activity Log (the audit trail behind "evidence for every
// recommendation"). Every action that changes something outside a read-only
// view — running a scan, drafting a reply, approving/dismissing/rejecting —
// is an explicit click by the signed-in admin. Nothing here sends a message,
// publishes a change, or runs automatically in the background.
// ============================================================================

interface Props {
  leads: ProjectLead[];
  services: ServiceRecord[];
  showToast: (msg: string) => void;
}

const severityColor: Record<string, string> = {
  high: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  low: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  info: 'bg-slate-700 text-slate-300 border-slate-600',
};

const statusColor: Record<string, string> = {
  new: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  approved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  dismissed: 'bg-slate-700 text-slate-400 border-slate-600',
  draft: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  rejected: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  marked_sent: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

export const AgentControlCenter: React.FC<Props> = ({ leads, services, showToast }) => {
  const [subTab, setSubTab] = useState<'seo' | 'drafts' | 'log'>('seo');

  // --- SEO state ---
  const [findings, setFindings] = useState<AgentFinding[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<SeoScanResponse | null>(null);
  const [findingsLoading, setFindingsLoading] = useState(false);

  // --- Lead draft state ---
  const [drafts, setDrafts] = useState<AgentLeadDraft[]>([]);
  const [draftingLeadId, setDraftingLeadId] = useState<string | null>(null);
  const [draftsLoading, setDraftsLoading] = useState(false);

  // --- Log state ---
  const [log, setLog] = useState<AgentActionLogEntry[]>([]);
  const [logLoading, setLogLoading] = useState(false);

  const loadFindings = async () => {
    setFindingsLoading(true);
    try {
      setFindings(await fetchAgentFindings());
    } finally {
      setFindingsLoading(false);
    }
  };

  const loadDrafts = async () => {
    setDraftsLoading(true);
    try {
      setDrafts(await fetchLeadDrafts());
    } finally {
      setDraftsLoading(false);
    }
  };

  const loadLog = async () => {
    setLogLoading(true);
    try {
      setLog(await fetchActionLog());
    } finally {
      setLogLoading(false);
    }
  };

  useEffect(() => {
    loadFindings();
    loadDrafts();
    loadLog();
  }, []);

  // --------------------------------------------------------------------------
  // SEO & Growth
  // --------------------------------------------------------------------------

  const handleRunScan = async () => {
    setIsScanning(true);
    try {
      const baseUrl = window.location.origin;
      const scan = await runSeoScan(baseUrl);
      setLastScan(scan);
      const saved = await persistSeoFindings(scan);
      setFindings((prev) => [...saved, ...prev]);
      showToast(`Scan complete — ${saved.length} finding(s) from ${scan.paths_scanned.length} real page(s).`);
    } catch (err: any) {
      showToast(err?.message || 'Scan failed.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleFindingDecision = async (finding: AgentFinding, status: 'approved' | 'dismissed') => {
    const ok = await setFindingStatus(finding, status);
    if (ok) {
      setFindings((prev) => prev.map((f) => (f.id === finding.id ? { ...f, status } : f)));
      showToast(`Finding ${status}.`);
    }
  };

  const newFindings = findings.filter((f) => f.status === 'new');
  const reviewedFindings = findings.filter((f) => f.status !== 'new');

  // --------------------------------------------------------------------------
  // Lead drafts
  // --------------------------------------------------------------------------

  const handleDraftForLead = async (lead: ProjectLead) => {
    setDraftingLeadId(lead.id);
    try {
      const result = await generateLeadDraft(lead, services);
      const saved = await persistLeadDraft(lead, result.draft_message, result.evidence, result.model_used);
      setDrafts((prev) => [saved, ...prev]);
      showToast(`Draft reply generated for ${lead.full_name}. Review before sending.`);
    } catch (err: any) {
      showToast(err?.message || 'Drafting failed.');
    } finally {
      setDraftingLeadId(null);
    }
  };

  const handleDraftDecision = async (draft: AgentLeadDraft, status: 'approved' | 'rejected' | 'marked_sent') => {
    const ok = await setDraftStatus(draft, status);
    if (ok) {
      setDrafts((prev) => prev.map((d) => (d.id === draft.id ? { ...d, status } : d)));
      showToast(
        status === 'marked_sent'
          ? 'Marked as sent. (This only updates the record — send the message yourself first.)'
          : `Draft ${status}.`
      );
    }
  };

  const copyDraft = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Draft copied — paste it into your email client to send.');
    } catch {
      showToast('Could not copy automatically — please select and copy the text manually.');
    }
  };

  return (
    <div className="pt-6 space-y-6 text-left">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-orange-500" />
            AI Agent Control Center
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            One human-supervised agent covering SEO &amp; growth analysis, live chat support, and lead-reply
            drafting. It inspects, analyzes, and drafts — it never publishes, contacts anyone, or sends anything
            on its own. Every row below only moves forward when you click approve.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Human approval required for every external action</span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setSubTab('seo')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
            subTab === 'seo' ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          SEO &amp; Growth
          {newFindings.length > 0 && (
            <span className="px-1.5 rounded-full bg-slate-950/60 text-[10px] font-mono">{newFindings.length}</span>
          )}
        </button>
        <button
          onClick={() => setSubTab('drafts')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
            subTab === 'drafts' ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          Lead Drafts
        </button>
        <button
          onClick={() => setSubTab('log')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
            subTab === 'log' ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          Activity Log
        </button>
      </div>

      {/* ============================ SEO & GROWTH ============================ */}
      {subTab === 'seo' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Scans this site's own live routes over HTTP right now and reports exactly what it finds. No
              scheduled or background scans — you trigger every run.
            </div>
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs cursor-pointer disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning live pages…' : 'Run SEO Scan'}
            </button>
          </div>

          {lastScan && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex flex-wrap gap-4">
              {Object.entries(lastScan.integration_status).map(([key, val]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="font-mono text-slate-300">{key.replace(/_/g, ' ')}:</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-bold text-[10px]">
                    UNVERIFIED — NOT CONNECTED
                  </span>
                </div>
              ))}
            </div>
          )}

          {findingsLoading ? (
            <div className="text-xs text-slate-500 py-8 text-center">Loading findings…</div>
          ) : findings.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-sm font-bold text-white">No scan run yet</div>
              <p className="text-xs text-slate-400">Click "Run SEO Scan" to analyze the live site's real pages.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...newFindings, ...reviewedFindings].map((f) => (
                <div key={f.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${severityColor[f.severity]}`}>
                        {f.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${statusColor[f.status]}`}>
                        {f.status.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">{f.data_source === 'live_page_fetch' ? 'VERIFIED (live fetch)' : 'UNVERIFIED'}</span>
                    </div>
                    {f.status === 'new' && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleFindingDecision(f, 'approved')}
                          className="p-1.5 rounded-lg bg-slate-950 hover:bg-emerald-950/40 text-slate-400 hover:text-emerald-300 border border-slate-800 cursor-pointer"
                          title="Approve"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleFindingDecision(f, 'dismissed')}
                          className="p-1.5 rounded-lg bg-slate-950 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 cursor-pointer"
                          title="Dismiss"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-200 font-semibold">{f.finding}</div>
                  <div className="text-[11px] text-slate-500 font-mono truncate">{f.page_url}</div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono whitespace-pre-wrap">
                    Evidence: {f.evidence}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <span className="text-slate-500">Recommendation: </span>
                    {f.recommendation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================ LEAD DRAFTS ============================ */}
      {subTab === 'drafts' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white pb-2">Generate a draft reply</h3>
            {leads.length === 0 ? (
              <div className="text-xs text-slate-500">No leads yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {leads.slice(0, 12).map((lead) => (
                  <div key={lead.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{lead.full_name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{lead.email}</div>
                    </div>
                    <button
                      onClick={() => handleDraftForLead(lead)}
                      disabled={draftingLeadId === lead.id}
                      className="px-2.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                    >
                      <Sparkles className="w-3 h-3" />
                      {draftingLeadId === lead.id ? 'Drafting…' : 'Draft AI Reply'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-white pb-2">Drafts awaiting review</h3>
            {draftsLoading ? (
              <div className="text-xs text-slate-500 py-4 text-center">Loading drafts…</div>
            ) : drafts.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                No drafts yet. Generate one above.
              </div>
            ) : (
              <div className="space-y-3">
                {drafts.map((d) => (
                  <div key={d.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="text-xs font-bold text-white">
                        {d.lead_name} <span className="text-slate-500 font-normal">({d.lead_email})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${statusColor[d.status]}`}>
                        {d.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {d.draft_message}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      <span className="text-slate-600">Evidence: </span>
                      {d.evidence}
                    </div>
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      <button
                        onClick={() => copyDraft(d.draft_message)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] text-slate-300 hover:text-white cursor-pointer flex items-center gap-1.5"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                      {d.status === 'draft' && (
                        <>
                          <button
                            onClick={() => handleDraftDecision(d, 'approved')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-emerald-950/40 border border-slate-700 text-[11px] text-emerald-300 cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Approve
                          </button>
                          <button
                            onClick={() => handleDraftDecision(d, 'rejected')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-rose-950/40 border border-slate-700 text-[11px] text-rose-300 cursor-pointer flex items-center gap-1.5"
                          >
                            <XCircle className="w-3 h-3" /> Reject
                          </button>
                        </>
                      )}
                      {d.status === 'approved' && (
                        <button
                          onClick={() => handleDraftDecision(d, 'marked_sent')}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] text-slate-300 cursor-pointer flex items-center gap-1.5"
                          title="Only updates this record — send the email yourself first, then mark it here."
                        >
                          <Mail className="w-3 h-3" /> Mark as Sent (after you send it)
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================ ACTIVITY LOG ============================ */}
      {subTab === 'log' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Append-only trail of every agent run and every approve/reject/dismiss decision — the evidence
              behind each recommendation above.
            </p>
            <button
              onClick={loadLog}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] text-slate-300 cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3 h-3 ${logLoading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
          {log.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
              No activity yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
              {log.map((entry) => (
                <div key={entry.id} className="p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-orange-400">{entry.action.replace(/_/g, ' ')}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(entry.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-slate-300">{entry.summary}</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Actor: {entry.actor === 'owner' ? 'You (owner)' : 'Agent (proposal only)'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

