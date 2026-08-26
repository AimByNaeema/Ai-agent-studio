import React from 'react';
import {
  Link,
  Brain,
  Globe,
  Search,
  Zap,
  FileText,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';

export const WorkflowSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Link':
        return <Link className="w-4 h-4" />;
      case 'Brain':
        return <Brain className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'SearchCheck':
        return <Search className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'FileText':
        return <FileText className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-14 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Structured 8-Stage Execution Cycle</span>
          </div>
          <h2
            id="workflow-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            How AI AGENT STUDIO Works.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A disciplined, closed-loop growth methodology combining autonomous intelligence with strict human-in-the-loop governance for every consequential store decision.
          </p>
        </div>

        {/* 8-Step Pipeline Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORKFLOW_STEPS.map((step) => {
            const isApproval = step.isApprovalGate;
            return (
              <div
                key={step.step}
                id={`workflow-step-${step.step}`}
                className={`relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ${
                  isApproval
                    ? 'bg-gradient-to-b from-orange-950/40 to-slate-950 border-2 border-orange-500/80 shadow-xl shadow-orange-500/10 ring-1 ring-orange-500/40'
                    : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-4">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isApproval
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                          : 'bg-slate-800 text-slate-200'
                      }`}
                    >
                      {getIcon(step.icon)}
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isApproval
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Step 0{step.step}
                    </span>
                  </div>

                  {/* Subtitle / Category */}
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    {step.subtitle}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-base font-bold leading-snug ${
                      isApproval ? 'text-orange-300' : 'text-white'
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono uppercase font-semibold ${
                      isApproval ? 'text-orange-400 flex items-center gap-1' : 'text-slate-400'
                    }`}
                  >
                    {isApproval && <Lock className="w-3 h-3 text-orange-400" />}
                    {step.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-500">0{step.step}/08</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
