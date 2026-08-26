import React, { useState } from 'react';
import {
  Network,
  Globe,
  Sparkles,
  Search,
  FileEdit,
  Megaphone,
  TrendingUp,
  BarChart3,
  Layout,
  ArrowRight,
  CheckCircle2,
  X,
  Layers,
  Cpu,
  CornerDownRight
} from 'lucide-react';
import { CAPABILITIES } from '../data/mockData';
import { Capability } from '../types';

interface PlatformSectionProps {
  onSelectCapability?: (cap: Capability) => void;
}

export const PlatformSection: React.FC<PlatformSectionProps> = () => {
  const [selectedCap, setSelectedCap] = useState<Capability | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'FileEdit':
        return <FileEdit className="w-5 h-5" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="platform" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 uppercase tracking-wider font-mono">
            <span>Modular Growth Architecture</span>
          </div>

          <h2
            id="platform-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Your Ecommerce Growth Team, Powered by AI.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Instead of fragmented tools, AI AGENT STUDIO unites 9 specialized intelligence capabilities into one continuous, synchronized growth engine tailored to your store.
          </p>
        </div>

        {/* Capability Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              id={`capability-card-${cap.id}`}
              onClick={() => setSelectedCap(cap)}
              className="group relative rounded-xl bg-slate-900/60 border border-slate-800 p-5 hover:bg-slate-900 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon & Index */}
                <div className="flex items-center justify-between pb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
                    {getIcon(cap.icon)}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-orange-400">
                    0{cap.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors mt-1">
                  {cap.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-3">
                  {cap.shortDesc}
                </p>
              </div>

              {/* Card Footer Micro-Action */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-orange-400">
                <span className="text-[11px] font-mono uppercase">{cap.category}</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <span>Inspect Agent</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Capability Inspector Modal */}
        {selectedCap && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              id="capability-detail-modal"
              className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full p-6 sm:p-7 text-left relative animate-in fade-in zoom-in-95 duration-150 text-white"
            >
              <button
                id="btn-close-cap-modal"
                onClick={() => setSelectedCap(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                  {getIcon(selectedCap.icon)}
                </div>
                <div>
                  <div className="text-xs font-mono text-orange-400 font-semibold uppercase">
                    Capability 0{selectedCap.number} • {selectedCap.category}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedCap.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                {selectedCap.fullDesc}
              </p>

              {/* Key Benefits */}
              <div className="mt-5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Core Capabilities & Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedCap.keyBenefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Execution IO */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block mb-1">Sample Prompt Trigger:</span>
                  <div className="text-slate-200 bg-slate-900 p-2.5 rounded border border-slate-800">
                    "{selectedCap.sampleInput}"
                  </div>
                </div>
                <div>
                  <span className="text-orange-400 text-[10px] uppercase block mb-1">Synthesized AI Strategy:</span>
                  <div className="text-emerald-300 bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] leading-relaxed">
                    {selectedCap.aiOutput}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedCap(null)}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
