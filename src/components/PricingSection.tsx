import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan, isAnnual: boolean) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Commercial Pricing</span>
          </div>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Predictable Plans for Every Stage of Growth.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Select the growth tier that aligns with your SKU volume and expansion goals. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              id="btn-pricing-billing-toggle"
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-slate-900 border border-slate-700 p-1 flex items-center transition-colors cursor-pointer relative"
              aria-label="Toggle annual or monthly pricing"
            >
              <div
                className={`w-4 h-4 rounded-full bg-orange-500 transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono border border-emerald-500/20">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? 'bg-slate-900 border-2 border-orange-500 shadow-2xl shadow-orange-500/15 ring-1 ring-orange-500/30 lg:-translate-y-2'
                    : 'bg-slate-900/70 border border-slate-800 shadow-sm hover:border-slate-700'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-extrabold uppercase tracking-wider font-mono shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-6 pb-6 border-b border-slate-800 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                    {isAnnual && (
                      <span className="text-[11px] text-slate-500 font-mono ml-auto">
                        Billed annually
                      </span>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-3">
                    <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
                      Included Capabilities
                    </span>
                    <ul className="space-y-2.5">
                      {(plan.features || []).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-8 mt-6 border-t border-slate-800 space-y-2">
                  <button
                    id={`btn-pricing-cta-${plan.id}`}
                    onClick={() => onSelectPlan(plan, isAnnual)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono text-center block">
                    14-day free trial • Cancel anytime
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Transparency & Limits Disclaimer */}
        <div className="mt-12 max-w-2xl mx-auto text-center space-y-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Usage Transparency Notice</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            “Plans and usage limits may vary as the platform evolves.” All plan allocations are calibrated to prevent unmonitored API bursts while maintaining high-capacity growth analysis.
          </p>
        </div>
      </div>
    </section>
  );
};
