import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  FileCode2,
  Palette,
  Hammer,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  ArrowRight,
  Lock,
  ChevronRight
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover & Understand',
      icon: Compass,
      subtitle: 'Analysis & Alignment',
      description:
        'We analyze your workflows, audience, and operational bottlenecks to define clear, measurable technical goals.',
    },
    {
      number: '02',
      title: 'Plan & Architect',
      icon: FileCode2,
      subtitle: 'System Specification',
      description:
        'We design data schemas, prompt trees, API integrations, and human approval gates before writing code.',
    },
    {
      number: '03',
      title: 'Design & Prototype',
      icon: Palette,
      subtitle: 'Interface & Flow',
      description:
        'We create responsive layouts, pairing typography with intuitive conversational interfaces and preview sandboxes.',
    },
    {
      number: '04',
      title: 'Build & Engineer',
      icon: Hammer,
      subtitle: 'Full-Stack Development',
      description:
        'We write clean React/TypeScript code, secure API proxy endpoints, and fine-grained Firestore security rules.',
    },
    {
      number: '05',
      title: 'Review, Test & Refine',
      icon: CheckCircle2,
      subtitle: 'Client Sign-Off Gate',
      description:
        'You review and test the live staging environment. We test edge cases and calibrate prompt responses.',
    },
    {
      number: '06',
      title: 'Launch & Support',
      icon: Rocket,
      subtitle: 'Zero Downtime Launch',
      description:
        'We deploy to production, connect domains, configure SSL, and provide ongoing technical maintenance.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-14 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Disciplined Methodology</span>
          </div>
          <h2
            id="workflow-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            How We Build <span className="text-orange-500">Your Solution.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A structured 6-step lifecycle combining modern full-stack development with strict human-in-the-loop governance for every mission-critical capability.
          </p>
        </div>

        {/* 6-Step Pipeline Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {steps.map((step) => {
            const IconComp = step.icon;
            const isReviewGate = step.number === '05';
            return (
              <div
                key={step.number}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 ${
                  isReviewGate
                    ? 'bg-gradient-to-b from-orange-950/30 to-slate-950 border-2 border-orange-500/80 shadow-xl shadow-orange-500/10'
                    : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isReviewGate
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                          : 'bg-slate-800 text-orange-400'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                        isReviewGate
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Step {step.number}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      {step.subtitle}
                    </span>
                    <h3
                      className={`text-base font-bold leading-snug ${
                        isReviewGate ? 'text-orange-300' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {isReviewGate ? 'Mandatory Gate' : 'Milestone'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{step.number}/06</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Methodology Page */}
        <div className="mt-12 text-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider font-mono hover:underline"
          >
            <span>Read Detailed Security & Human Approval Guidelines</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
