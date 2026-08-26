import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Link2,
  Brain,
  Globe,
  BarChart,
  Lightbulb,
  ShieldCheck,
  Zap,
  Activity,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Eye,
  Lock,
  Workflow
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const HowItWorksPage: React.FC = () => {
  usePageMetadata({
    title: 'How It Works: 9-Stage AI Growth Workflow',
    description: 'Learn how AI AGENT STUDIO executes its 9-stage operational pipeline from Business Connection and AI Understanding to Human Approval, Action, and Adaptive Optimization.',
  });

  const [activeStep, setActiveStep] = useState<number>(1);

  const pipelineStages = [
    {
      step: 1,
      title: 'Business Connection',
      subtitle: 'Secure, Read-Only Storefront & Ad Integration',
      description: 'Connect your Shopify, Amazon Seller Central, WooCommerce, Meta Ads, and Google Analytics in under 60 seconds with OAuth read-only permissions. No invasive scripts or store downtime.',
      icon: Link2,
      tag: 'Read-Only OAuth',
      inputs: ['Store Catalog & SKU List', 'Historical Order Logs', 'Ad Manager Spend Data'],
      aiOutput: 'Encrypted telemetry stream established with 15-minute polling interval.',
      isApprovalGate: false,
    },
    {
      step: 2,
      title: 'AI Understanding',
      subtitle: 'Baseline Synthesis & Customer Cohort Mapping',
      description: 'The Chief AI Orchestrator ingests catalog metadata, customer purchase frequencies, AOV distributions, and historical return reasons to build an operational store twin.',
      icon: Brain,
      tag: 'Store Twin Model',
      inputs: ['2,400 Historic Orders', '180 Catalog SKUs', 'Product Customer Reviews'],
      aiOutput: 'Store baseline computed: 3.82% CR, $53.87 AOV, 60-day LTV $84.20.',
      isApprovalGate: false,
    },
    {
      step: 3,
      title: 'Research',
      subtitle: 'Global Marketplace & Competitor Scanning',
      description: 'Autonomous research agents scan global demand velocity, competitor pricing dynamics, and search query trends across North America, Europe, and Asia.',
      icon: Globe,
      tag: 'Global Scan',
      inputs: ['Global Search Trends', 'Competitor Listing Changes', 'Supplier Catalog Costs'],
      aiOutput: 'Scanned 1.4M competitor listings; identified 4 high-margin category whitespaces.',
      isApprovalGate: false,
    },
    {
      step: 4,
      title: 'Analysis',
      subtitle: 'Margin Elasticity & Decay Detection',
      description: 'Deep diagnostic modeling detects ranking decay on non-branded keywords, flags ad creative fatigue across Meta and TikTok, and tests unit gross margin sensitivity curves.',
      icon: BarChart,
      tag: 'Root-Cause Diagnostics',
      inputs: ['Search Position Index', 'Ad Set Frequency & CPA', 'Unit Landed Costs'],
      aiOutput: 'Identified 7 decaying organic keywords and 2 fatigued ad sets causing $1,400/mo waste.',
      isApprovalGate: false,
    },
    {
      step: 5,
      title: 'Recommendations',
      subtitle: 'ROI-Prioritized Growth Directives & Visual Diffs',
      description: 'The AI synthesizes atomic growth directives ranked by projected dollar impact and implementation complexity. Generates ready-to-deploy copy, metadata, and ad concepts.',
      icon: Lightbulb,
      tag: 'Impact-Ranked Directives',
      inputs: ['Root-Cause Analysis', 'Copywriting Rules Engine', 'Commercial ROI Model'],
      aiOutput: 'Drafted 5 listing rewrites and 1 VIP retention email flow with +$18.4k projected lift.',
      isApprovalGate: false,
    },
    {
      step: 6,
      title: 'Approval (Human Gatekeeper)',
      subtitle: 'Merchant Review with Zero Silent Store Changes',
      description: 'CRITICAL SECURITY GATE: You inspect side-by-side visual diffs before anything touches your live store. Approve, modify, or reject any recommendation with a single click.',
      icon: ShieldCheck,
      tag: 'Strict Security Gate',
      inputs: ['Side-by-Side Visual Diff', 'Projected Profit Lift', 'Cryptographic Token Signoff'],
      aiOutput: 'Merchant approved 4 listing updates; scheduled live dispatch for off-peak window.',
      isApprovalGate: true,
    },
    {
      step: 7,
      title: 'Action',
      subtitle: 'Safe Staged Execution via API Webhooks',
      description: 'Approved recommendations are dispatched through verified storefront APIs and ad channel endpoints. Supports immediate deployment or automated off-peak scheduling.',
      icon: Zap,
      tag: 'API Dispatch',
      inputs: ['Merchant Approval Signature', 'Staged Payload', 'Channel API Endpoints'],
      aiOutput: 'Updated 4 Shopify product listings and launched 2 Meta DPA creative variants.',
      isApprovalGate: false,
    },
    {
      step: 8,
      title: 'Measurement',
      subtitle: 'Real-Time Conversion & Attribution Telemetry',
      description: 'Tracks post-dispatch ranking velocity, organic click-through rates, add-to-cart ratios, and blended ROAS to isolate exact revenue lifts generated by each action.',
      icon: Activity,
      tag: 'Live Telemetry',
      inputs: ['Post-Deployment Clickstream', 'Shopify Orders', 'Ad Platform Conversion APIs'],
      aiOutput: 'Recorded +38% organic CTR lift and +0.64% store conversion rate gain.',
      isApprovalGate: false,
    },
    {
      step: 9,
      title: 'Optimization',
      subtitle: 'Adaptive Learning Feedback Loop',
      description: 'Attribution outcomes feed back into the store twin model, calibrating future agent hypotheses, copy nuances, and bidding formulas for continuous compounding growth.',
      icon: RefreshCw,
      tag: 'Compounding Intelligence',
      inputs: ['Attribution Delta', 'Merchant Approval Preferences', 'Seasonality Adjustments'],
      aiOutput: 'Fine-tuned prompt parameters for SKU category; scheduled next scan in 7 days.',
      isApprovalGate: false,
    },
  ];

  const currentStage = pipelineStages.find((s) => s.step === activeStep) || pipelineStages[0];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'How It Works' }]} />

        {/* Page Hero */}
        <div className="pt-6 pb-12 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <Workflow className="w-3.5 h-3.5" />
            <span>9-Stage Operational Pipeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            From Raw Storefront Data to <span className="text-orange-500">Compounding Profit</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Understand the complete step-by-step intelligence loop that powers AI AGENT STUDIO — backed by strict human approval and zero silent modifications.
          </p>
        </div>

        {/* Interactive Pipeline Step Switcher */}
        <div className="my-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
                Interactive Pipeline Simulator
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Step-Through Pipeline Navigation
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Step {currentStage.step} of 9</span>
            </div>
          </div>

          {/* Stepper Buttons Bar */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {pipelineStages.map((stage) => {
              const isSelected = stage.step === activeStep;
              const Icon = stage.icon;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(stage.step)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/25'
                      : stage.isApprovalGate
                      ? 'bg-slate-950 border-emerald-500/40 text-emerald-400 hover:border-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold">0{stage.step}</span>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold truncate mt-2 block">{stage.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Inspector Details */}
          <div className="p-6 sm:p-8 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Description & Mechanism */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    currentStage.isApprovalGate
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  }`}>
                    {React.createElement(currentStage.icon, { className: 'w-5 h-5' })}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                      Stage 0{currentStage.step} • {currentStage.tag}
                    </div>
                    <h3 className="text-xl font-bold text-white">{currentStage.title}</h3>
                  </div>
                </div>

                <div className="text-sm font-semibold text-slate-200">
                  {currentStage.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentStage.description}
                </p>

                {currentStage.isApprovalGate && (
                  <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Human-in-the-Loop Guarantee</span>
                      <span>No changes will ever be made to your live store without explicit merchant review and approval.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Ingested Inputs & Synthetic Output */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                    Telemetry Inputs Processed
                  </span>
                  <div className="space-y-1.5">
                    {currentStage.inputs.map((inp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        <span>{inp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-orange-500/30 space-y-2 text-xs shadow-lg shadow-orange-500/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">
                      Autonomous Pipeline Output
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">Verified</span>
                  </div>
                  <p className="text-slate-200 font-mono text-[11px] leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {currentStage.aiOutput}
                  </p>
                </div>

                {/* Next / Previous Controls */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    className="px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    disabled={activeStep === 9}
                    onClick={() => setActiveStep(prev => Math.min(9, prev + 1))}
                    className="px-3.5 py-1.5 rounded-md bg-orange-500 hover:bg-orange-600 text-xs font-mono text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9-Stage Full Flow Summary Cards */}
        <div className="my-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
              Complete Flow Architecture
            </span>
            <h2 className="text-2xl font-bold text-white">
              The 9 Workflow Stages Explained
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pipelineStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    stage.isApprovalGate
                      ? 'bg-slate-900 border-emerald-500/40'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        stage.isApprovalGate ? 'bg-emerald-500 text-white' : 'bg-slate-950 border border-slate-800 text-orange-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        STAGE 0{stage.step}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{stage.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{stage.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                    Tag: <span className="text-orange-400 font-semibold">{stage.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Connect Your Store to Initialize the Pipeline</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            14-day free trial. Takes 60 seconds with zero risk and read-only scopes.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/get-started"
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-sm text-white shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
            >
              <span>Connect Store Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
