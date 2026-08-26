import React, { useState } from 'react';
import {
  Megaphone,
  Users,
  Gift,
  Send,
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { MARKETING_CAMPAIGN_SAMPLE } from '../data/mockData';

export const MarketingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'playbook' | 'timeline' | 'channels'>('playbook');
  const campaign = MARKETING_CAMPAIGN_SAMPLE;

  return (
    <section id="marketing" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
            <Megaphone className="w-3.5 h-3.5" />
            <span>AI Campaign Orchestration</span>
          </div>
          <h2
            id="marketing-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            From Insight to Marketing Strategy.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Transform customer cohort data, inventory surplus, and seasonal demand peaks into high-converting multichannel marketing playbooks without weeks of manual planning.
          </p>
        </div>

        {/* Campaign Planning Interface Container */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl overflow-hidden">
          {/* Top Interface Bar */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono text-orange-400 font-bold uppercase">
                  Generated Campaign Blueprint
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {campaign.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {campaign.projectedRoas}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                {campaign.timeline}
              </span>
            </div>
          </div>

          {/* Campaign Strategy Grid */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. Target Audience */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-mono font-bold uppercase">
                  <Users className="w-4 h-4" />
                  <span>Target Audience</span>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {campaign.audience}
                </p>
              </div>

              {/* 2. Core Offer & Incentive */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-mono font-bold uppercase">
                  <Gift className="w-4 h-4" />
                  <span>Offer Structure</span>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {campaign.offer}
                </p>
              </div>

              {/* 3. Campaign Type */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-mono font-bold uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>Campaign Model</span>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {campaign.campaignType}
                </p>
              </div>

              {/* 4. Primary Channels */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-mono font-bold uppercase">
                  <Layers className="w-4 h-4" />
                  <span>Channel Cadence</span>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {campaign.primaryChannel}
                </p>
              </div>

              {/* 5. Creative Content Angle */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-mono font-bold uppercase">
                  <Send className="w-4 h-4" />
                  <span>Creative Angle</span>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {campaign.contentAngle}
                </p>
              </div>

              {/* 6. Target KPI & Revenue Goal */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-mono font-bold uppercase">
                  <Target className="w-4 h-4" />
                  <span>Target KPI</span>
                </div>
                <p className="text-xs text-emerald-400 font-mono font-bold leading-relaxed">
                  {campaign.targetKpi}
                </p>
              </div>
            </div>

            {/* Call to Action (CTA) & Budget Strip */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Recommended Primary CTA:</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  "{campaign.ctaText}"
                </span>
                <span className="text-xs text-slate-400 font-mono mt-1 block">
                  Budget Recommendation: {campaign.budgetRecommendation}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono shrink-0">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Ready for Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
