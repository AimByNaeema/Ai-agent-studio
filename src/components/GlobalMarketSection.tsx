import React, { useState } from 'react';
import { Globe, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, BarChart, ArrowUpRight, Compass } from 'lucide-react';
import { MARKET_REGIONS } from '../data/mockData';
import { MarketRegion } from '../types';

export const GlobalMarketSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>(MARKET_REGIONS[0]);

  return (
    <section id="global-markets" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider border border-slate-700">
              <Compass className="w-3.5 h-3.5" />
              <span>Cross-Border Demand Radar</span>
            </div>
            <h2
              id="global-markets-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Discover Where the Next Opportunity Is.
            </h2>
            <p className="text-base text-slate-300">
              AI AGENT STUDIO evaluates multi-region marketplace data to highlight consumer demand shifts, pricing power, and regulatory readiness across global corridors.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span>Illustrative Intelligence Demo UI</span>
          </div>
        </div>

        {/* Region Switcher Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MARKET_REGIONS.map((region) => {
            const isActive = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                id={`btn-region-tab-${region.id}`}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                <span className="text-base">{region.flag}</span>
                <span>{region.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400'}`}>
                  {region.trendVelocity}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Intelligence Grid for Selected Region */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Key Intelligence Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{selectedRegion.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedRegion.name}</h3>
                    <span className="text-xs text-slate-400 font-mono">Market Corridor: {selectedRegion.code}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Opportunity Score</span>
                  <span className="text-xl font-extrabold text-orange-400 font-mono">
                    {selectedRegion.opportunityScore} / 100
                  </span>
                </div>
              </div>

              {/* Metric Matrix */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-mono">Market Demand Index</span>
                  <div className="text-lg font-bold text-white mt-1 flex items-center gap-1.5">
                    <span>{selectedRegion.demandIndex} / 100</span>
                    <span className="text-xs text-emerald-400 font-mono font-normal">High</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-mono">Competition Saturation</span>
                  <div className="text-lg font-bold text-white mt-1">
                    {selectedRegion.competition}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-mono">6-Month Trend Velocity</span>
                  <div className="text-lg font-bold text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{selectedRegion.trendVelocity}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-mono">Avg Basket (AOV)</span>
                  <div className="text-lg font-bold text-orange-300 mt-1">
                    {selectedRegion.avgOrderValue}
                  </div>
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-200 block">Trade & Compliance Note:</span>
                  <span className="text-slate-400">{selectedRegion.regulatoryNote}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Growth Niches & Product Whitespace */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Top Surging Product Niches ({selectedRegion.name})
                  </span>
                  <span className="text-xs text-orange-400 font-mono">AI Ranked</span>
                </div>

                <div className="space-y-2.5">
                  {selectedRegion.topNiches.map((niche, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-orange-400 text-xs font-bold flex items-center justify-center font-mono">
                          0{idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-white">{niche}</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 font-medium">
                        <ArrowUpRight className="w-3.5 h-3.5" /> High Margin
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Highlight Opportunity Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-orange-400 uppercase tracking-wider font-mono">
                    Featured Regional Opportunity
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                    Validated Supplier Route
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {selectedRegion.topProductOpportunity}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High cross-border search intent with low domestic brand consolidation in {selectedRegion.name}. Ready for listing testing and localized ad angle deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
