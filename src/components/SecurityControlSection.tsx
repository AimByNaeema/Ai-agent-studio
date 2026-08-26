import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  FileCheck,
  SlidersHorizontal,
  KeyRound,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';

export const SecurityControlSection: React.FC = () => {
  const [simulationStatus, setSimulationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  return (
    <section id="security" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Human-in-the-Loop Governance</span>
          </div>
          <h2
            id="security-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            AI That Works With You, Not Without You.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Autonomous growth recommendations without catastrophic autonomous mistakes. You retain full veto power and cryptographic auditability over every live storefront adjustment.
          </p>
        </div>

        {/* 2-Column Trust Architecture + Interactive Approval Sandbox */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Core Security Pillars */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-950 text-white shrink-0 mt-0.5 border border-slate-800">
                <UserCheck className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Approval-Controlled Actions</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Price changes, ad spend scaling, and live inventory listings require your explicit one-click sign-off.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-950 text-white shrink-0 mt-0.5 border border-slate-800">
                <KeyRound className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Secure Read-First Credentials</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Storefront APIs connect with restricted read-only tokens by default. Write permissions are isolated and locked.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-950 text-white shrink-0 mt-0.5 border border-slate-800">
                <SlidersHorizontal className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Permission-Based Tool Sandboxes</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  AI sub-agents execute inside hardened, parameter-validated boundaries with zero unmonitored external network calls.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-950 text-white shrink-0 mt-0.5 border border-slate-800">
                <FileCheck className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Immutable Audit Trail</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Every recommendation, parameter diff, timestamp, and merchant decision is logged in an encrypted compliance ledger.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive "Action Approval Request" Sandbox */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                    Interactive Safety Simulation
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Action ID: #ACT-9042
                </span>
              </div>

              {/* Approval Card Simulation Header */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-orange-400 font-bold font-mono">Consequential Action Proposed</span>
                  <span className="text-xs font-mono text-slate-400">Target: Shopify Storefront</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Update Listing Copy & Keyword Index for SKU #301
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-mono">Projected Impact</span>
                    <span className="font-bold text-emerald-400 font-mono">+$14.6K / mo</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-mono">Risk Assessment</span>
                    <span className="font-bold text-slate-200 font-mono">Low (0 Price Impact)</span>
                  </div>
                </div>
              </div>

              {/* Status Display */}
              {simulationStatus === 'pending' && (
                <div className="space-y-3 pt-1">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Test the merchant workflow: Click "Approve Action" to simulate immediate safe publication or "Reject" to decline.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      id="btn-simulate-approve"
                      onClick={() => setSimulationStatus('approved')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Publish to Store</span>
                    </button>
                    <button
                      id="btn-simulate-reject"
                      onClick={() => setSimulationStatus('rejected')}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              )}

              {simulationStatus === 'approved' && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Action Approved & Executed
                    </span>
                    <button
                      onClick={() => setSimulationStatus('pending')}
                      className="text-[10px] text-slate-400 hover:text-white underline font-mono cursor-pointer"
                    >
                      Reset Simulation
                    </button>
                  </div>
                  <p className="text-xs text-slate-300">
                    Listing updated via secure Shopify Admin API. Rollback snapshot saved to audit ledger.
                  </p>
                </div>
              )}

              {simulationStatus === 'rejected' && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Action Safely Archived
                    </span>
                    <button
                      onClick={() => setSimulationStatus('pending')}
                      className="text-[10px] text-slate-400 hover:text-white underline font-mono cursor-pointer"
                    >
                      Reset Simulation
                    </button>
                  </div>
                  <p className="text-xs text-slate-300">
                    Action dismissed. No changes were made to your live store. Agent updated with preference feedback.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CostEfficiencySection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-bold">
                Optimized Agent Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Intelligent by Design. Efficient by Default.
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              Zero Computational Waste
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Efficient AI Routing</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Dispatches tasks exclusively to specialized sub-agents to minimize execution overhead.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Minimal Context Windows</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Pinpoints high-signal SKU telemetry without passing bloated raw datasets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Controlled Tool Usage</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Strict parameter bounds prevent recursive prompt loops and uncontrolled API consumption.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Reusable Data Layers</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Caches catalog embeddings and regional trade data for lightning-fast query resolution.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-bold text-white block">Cost-Aware Execution</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Prioritizes highest-ROI operational tasks first, protecting your budget and margins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
