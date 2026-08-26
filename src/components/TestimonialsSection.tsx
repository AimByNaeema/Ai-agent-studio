import React from 'react';
import { Quote, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Demonstration Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for High-Velocity Operators.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            See how modern ecommerce teams leverage synchronized AI capabilities to out-execute incumbents.
          </p>
          <span className="text-[11px] font-mono text-slate-400 block">
            (Illustrative Demo Merchant Profiles)
          </span>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 flex flex-col justify-between space-y-5 shadow-xl hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                {/* Result Metric Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-bold font-mono border border-orange-500/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t.metricsResult}</span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Strip */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-orange-400 font-mono font-bold flex items-center justify-center text-xs shrink-0 border border-slate-700">
                  {t.avatarInitials}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.role}</div>
                  <div className="text-[11px] text-slate-400">{t.merchantCategory}</div>
                  <div className="text-[10px] font-mono text-slate-400">{t.businessScale}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
