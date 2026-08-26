import React, { useState } from 'react';
import {
  Search,
  FileEdit,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sliders,
  Sparkles,
  HelpCircle,
  Hash
} from 'lucide-react';
import { SEO_LISTING_SAMPLE } from '../data/mockData';

export const SeoListingSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');
  const sample = SEO_LISTING_SAMPLE;

  return (
    <section id="seo-listing" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-12 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>Dual Search & Conversion Engine</span>
          </div>
          <h2
            id="seo-listing-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            SEO Precision Meets High-Converting Copy.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Rank higher in marketplace search and convert cold organic visitors into paying customers with algorithmic keyword placement and benefit-led copywriting.
          </p>
        </div>

        {/* Split Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: SEO Intelligence */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                    Target Keyword Intelligence
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Commercial Search
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase">Analyzed SKU</span>
                <h4 className="text-base font-bold text-white mt-0.5">{sample.productName}</h4>
              </div>

              {/* Keyword Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-mono">Monthly Search Volume</span>
                  <span className="text-sm font-bold text-white font-mono mt-0.5 block">{sample.searchVolume}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-mono">Keyword Difficulty</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">{sample.keywordDifficulty}</span>
                </div>
              </div>

              {/* Search Intent & Opportunity */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 uppercase text-[10px]">Buyer Search Intent:</span>
                  <span className="text-orange-400 font-semibold">{sample.searchIntent}</span>
                </div>
                <div className="text-xs font-mono text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                  "{sample.primaryKeyword}"
                </div>
              </div>

              {/* Conversion Recommendations Box */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Conversion Boost Recommendations
                </span>
                <div className="space-y-2">
                  {sample.after.improvements.map((imp, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Listing Optimizer with Live Before/After Toggle */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-5">
              {/* Header with Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileEdit className="w-4 h-4 text-orange-400" />
                    <span>Listing Copy Engine</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Instant Before vs. After Comparison</span>
                </div>

                {/* View Switcher Button Group */}
                <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
                  <button
                    id="btn-seo-view-before"
                    onClick={() => setViewMode('before')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      viewMode === 'before'
                        ? 'bg-slate-800 text-slate-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Original Listing (Before)
                  </button>
                  <button
                    id="btn-seo-view-after"
                    onClick={() => setViewMode('after')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'after'
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Optimized (After)</span>
                  </button>
                </div>
              </div>

              {/* Quality & Score Gauge */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">SEO Index Score</span>
                  <div className="text-lg font-bold font-mono mt-0.5">
                    {viewMode === 'after' ? (
                      <span className="text-emerald-400">{sample.after.seoScore} / 100 (+48 pts)</span>
                    ) : (
                      <span className="text-slate-400">{sample.before.seoScore} / 100</span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Readability Index</span>
                  <div className="text-lg font-bold font-mono mt-0.5">
                    {viewMode === 'after' ? (
                      <span className="text-emerald-400">{sample.after.readabilityScore} / 100</span>
                    ) : (
                      <span className="text-amber-400">{sample.before.readabilityScore} / 100</span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Projected Lift</span>
                  <div className="text-xs font-bold text-orange-400 mt-1 font-mono">
                    {viewMode === 'after' ? sample.after.projectedCtrLift : 'Baseline'}
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-slate-400">Optimized Title:</span>
                <div
                  className={`p-3.5 rounded-xl border text-sm font-semibold leading-snug transition-all ${
                    viewMode === 'after'
                      ? 'bg-slate-900 border-orange-500/40 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {viewMode === 'after' ? sample.after.title : sample.before.title}
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400">Features & Benefits Copy:</span>
                <div className="space-y-2">
                  {(viewMode === 'after' ? sample.after.bulletPoints : sample.before.bulletPoints).map(
                    (bullet, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${
                          viewMode === 'after'
                            ? 'bg-slate-900/90 border-slate-800 text-slate-200'
                            : 'bg-slate-950 border-slate-800/80 text-slate-400'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-orange-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{bullet}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Description Preview */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-slate-400">Product Story & Clinical Description:</span>
                <p className="text-xs text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  {viewMode === 'after' ? sample.after.description : sample.before.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
