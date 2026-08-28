import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Layout,
  Globe,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Database,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { INITIAL_SERVICES } from '../lib/firebase';

export const PlatformSection: React.FC = () => {
  const services = INITIAL_SERVICES;

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'custom-ai-agents':
        return <Bot className="w-5 h-5" />;
      case 'web-development':
        return <Layout className="w-5 h-5" />;
      case 'ecommerce-solutions':
        return <Globe className="w-5 h-5" />;
      case 'ai-automation':
        return <Zap className="w-5 h-5" />;
      case 'custom-digital-solutions':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const getServiceLink = (slug: string) => {
    switch (slug) {
      case 'custom-ai-agents':
        return '/ai-agents';
      case 'web-development':
        return '/web-development';
      case 'ecommerce-solutions':
        return '/solutions';
      case 'ai-automation':
        return '/solutions';
      case 'custom-digital-solutions':
        return '/solutions';
      default:
        return '/solutions';
    }
  };

  return (
    <section id="services" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 uppercase tracking-wider font-mono">
            <span>What We Do</span>
          </div>

          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Digital Systems Designed Around <span className="text-orange-500">Your Business Needs.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We build custom AI agents, professional websites, ecommerce systems, automation workflows, and bespoke digital tools with strict engineering standards.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-5 hover:border-slate-700 hover:bg-slate-900 transition-all shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 text-orange-400 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                    {getServiceIcon(srv.slug)}
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-orange-400">
                    0{srv.sort_order}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {srv.short_description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Core Capabilities
                  </span>
                  {(srv.key_features || []).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to={getServiceLink(srv.slug)}
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Available
                </span>
              </div>
            </div>
          ))}

          {/* Sixth Special Card: Custom Engineering Scope */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/30 flex flex-col justify-between space-y-5 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-orange-400 font-bold">Bespoke</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Custom System Scoping</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Have unique operational requirements? We engineer custom multi-agent workflows, API adapters, and dedicated database schemas from scratch.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Strict security rules & human approvals</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Google Cloud Firestore data persistence</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                to="/contact"
                className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
              >
                <span>Request Custom Scoping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
