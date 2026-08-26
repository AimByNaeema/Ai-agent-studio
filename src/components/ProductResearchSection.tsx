import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Percent,
  Search,
  Filter,
  ArrowUpRight,
  Info,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  Layers
} from 'lucide-react';
import { PRODUCT_OPPORTUNITIES } from '../data/mockData';
import { ProductOpportunity } from '../types';

export const ProductResearchSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductOpportunity>(PRODUCT_OPPORTUNITIES[0]);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Workplace & Ergonomics', 'Kitchen & Beverage', 'Sleep & Wellness', 'Consumer Electronics'];

  const filteredProducts = filterCategory === 'All'
    ? PRODUCT_OPPORTUNITIES
    : PRODUCT_OPPORTUNITIES.filter(p => p.category === filterCategory);

  return (
    <section id="product-research" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-800">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Product Whitespace Engine</span>
            </div>
            <h2
              id="product-research-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Find Products Worth Building a Business Around.
            </h2>
            <p className="text-base text-slate-300">
              Stop guessing which products to launch. AI AGENT STUDIO evaluates real supplier unit costs, customer review sentiment, and search velocity to quantify exact margin upside and risk.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 shadow-sm">
              Live Opportunity Score Database
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SaaS Opportunity Matrix */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Product Opportunity List (Left) */}
          <div className="lg:col-span-7 space-y-3.5">
            {filteredProducts.map((prod) => {
              const isSelected = selectedProduct.id === prod.id;
              return (
                <div
                  key={prod.id}
                  id={`product-row-${prod.id}`}
                  onClick={() => setSelectedProduct(prod)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-orange-500 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                        {prod.category}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        {prod.title}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-flex flex-col items-end">
                        <span className="text-[10px] uppercase font-mono text-slate-400">Opp. Score</span>
                        <span className="text-xl font-extrabold text-orange-400 font-mono">
                          {prod.opportunityScore}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-800 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Demand</span>
                      <span className="font-semibold text-white">{prod.demandLevel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Competition</span>
                      <span className="font-semibold text-white">{prod.competition}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Margin Est.</span>
                      <span className="font-bold text-emerald-400 font-mono">{prod.marginPotential}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Risk Level</span>
                      <span className={`font-semibold ${prod.risk === 'Low' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {prod.risk}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-[10px] text-slate-400 block font-mono">Search Vol</span>
                      <span className="font-semibold text-white font-mono">{prod.monthlySearchVolume}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Product Deep Dive Detail Card (Right) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5 text-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                    AI Unit Economics Audit
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-bold border border-orange-500/20">
                  Score {selectedProduct.opportunityScore}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">{selectedProduct.category}</span>
                <h4 className="text-lg font-bold text-white mt-1">{selectedProduct.title}</h4>
              </div>

              {/* Price & Margin Breakdown Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase">Projected Unit Economics</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Est. Cost (Landed)</span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5">{selectedProduct.costEstimate}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Suggested Retail</span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5">{selectedProduct.suggestedRetail}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Gross Margin</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{selectedProduct.marginPotential}</span>
                  </div>
                </div>
              </div>

              {/* Key Differentiator Recommendation */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Why This Opportunity Wins
                </span>
                <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-lg bg-slate-900 border border-slate-800">
                  {selectedProduct.keyDifferentiator}
                </p>
              </div>

              {/* Quantitative Metrics Checklist */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 font-medium">Monthly Organic Search Volume</span>
                  <span className="font-bold text-white font-mono">{selectedProduct.monthlySearchVolume}/mo</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 font-medium">Year-over-Year Growth Velocity</span>
                  <span className="font-bold text-emerald-400 font-mono">{selectedProduct.growthYoY}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 font-medium">Market Fit Alignment</span>
                  <span className="font-bold text-white font-mono">{selectedProduct.marketFit} / 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
