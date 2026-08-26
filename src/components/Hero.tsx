import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  Search,
  CheckCircle2,
  DollarSign,
  ShoppingCart,
  BarChart2,
  Globe,
  Layers,
  ChevronRight,
  Activity,
  AlertCircle
} from 'lucide-react';

interface HeroProps {
  onStartGrowing: () => void;
  onExplorePlatform: () => void;
  onOpenProductDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartGrowing,
  onExplorePlatform,
  onOpenProductDemo,
}) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'opportunities' | 'seo' | 'ads'>('sales');

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-950 text-white overflow-hidden border-b border-slate-800/80"
    >
      {/* Subtle architectural background grid - no cheesy slop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* High-tier Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-200">AI Commerce Engine</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">8 Synchronized Growth Agents</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-sans"
            >
              Turn Your Ecommerce Data Into <span className="text-orange-500">Growth.</span>
            </h1>

            {/* Supporting Text */}
            <p
              id="hero-supporting-text"
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              An intelligent AI growth platform that researches markets, discovers products, optimizes SEO and listings, plans marketing, analyzes advertising and helps ecommerce businesses make smarter growth decisions.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="btn-hero-primary-cta"
                onClick={onStartGrowing}
                className="px-7 py-3.5 text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <span>Start Growing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-secondary-cta"
                onClick={onExplorePlatform}
                className="px-6 py-3.5 text-base font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <span>Explore Platform</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust Statement */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-300">Built for modern ecommerce businesses.</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> Human Approval Governance
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> Read-Only API First
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium AI Ecommerce Growth Dashboard Visual */}
          <div className="lg:col-span-6">
            <div
              id="hero-dashboard-container"
              className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-slate-950/70 p-4 sm:p-5 text-left backdrop-blur-sm"
            >
              {/* Dashboard Window Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/90 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">growth-agent.console/live</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Telemetry
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
                    Demo Environment
                  </span>
                </div>
              </div>

              {/* Mini Interactive View Switcher inside Dashboard */}
              <div className="flex items-center gap-1 py-3 border-b border-slate-800/70 overflow-x-auto text-xs">
                <button
                  id="tab-hero-sales"
                  onClick={() => setActiveTab('sales')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'sales'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 text-orange-400" />
                  <span>Sales & Revenue</span>
                </button>

                <button
                  id="tab-hero-opportunities"
                  onClick={() => setActiveTab('opportunities')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'opportunities'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Product Radar</span>
                </button>

                <button
                  id="tab-hero-seo"
                  onClick={() => setActiveTab('seo')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'seo'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-orange-400" />
                  <span>SEO & Listing</span>
                </button>

                <button
                  id="tab-hero-ads"
                  onClick={() => setActiveTab('ads')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'ads'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>Ad ROAS</span>
                </button>
              </div>

              {/* Dynamic Dashboard Content */}
              <div className="py-4 space-y-4">
                {activeTab === 'sales' && (
                  <div className="space-y-3.5 animate-in fade-in duration-150">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Monthly GMV</div>
                        <div className="text-xl font-bold text-white mt-1">$184,250</div>
                        <div className="text-[11px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                          <TrendingUp className="w-3 h-3" /> +23.4% YoY
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Store Conversion</div>
                        <div className="text-xl font-bold text-white mt-1">3.82%</div>
                        <div className="text-[11px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                          <TrendingUp className="w-3 h-3" /> +0.64% Lift
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 col-span-2 sm:col-span-1">
                        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Avg Order Value</div>
                        <div className="text-xl font-bold text-white mt-1">$53.87</div>
                        <div className="text-[11px] text-orange-400 flex items-center gap-0.5 mt-0.5">
                          <span>+$4.20 Bundle Lift</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Sales Growth Sparkline / Curve */}
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">Revenue Acceleration Curve (Q3)</span>
                        <span className="text-emerald-400 font-mono font-medium">+ $34,800 Net MoM</span>
                      </div>
                      <div className="h-16 w-full flex items-end gap-2 pt-2">
                        {[40, 52, 48, 64, 70, 68, 85, 92, 98].map((val, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                            <div
                              className="w-full rounded-t transition-all duration-300 bg-gradient-to-t from-slate-800 to-orange-500/80 hover:to-orange-500"
                              style={{ height: `${val}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'opportunities' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">Top Detected Category Whitespace</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          Score: 95/100
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        Acoustic MagSafe Desk Partitions with Cable Channel
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                        <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Gross Margin</span>
                          <span className="font-bold text-emerald-400 font-mono">68%</span>
                        </div>
                        <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Search Velocity</span>
                          <span className="font-bold text-orange-400 font-mono">+114% YoY</span>
                        </div>
                        <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Competition</span>
                          <span className="font-bold text-slate-200">Low (8 Sellers)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">Listing Optimization Diagnostic</span>
                        <span className="text-emerald-400 font-mono text-[11px]">Score 96/100 (+48 pts)</span>
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Added 7 commercial buyer intent keywords</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Structured mobile-first benefit bullet points</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                          <span>Projected CTR Lift: +38% on organic search</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ads' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">Omnichannel Ad ROAS Optimization</span>
                        <span className="text-emerald-400 font-mono text-[11px]">Blended ROAS: 4.2x</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400 font-mono">Meta DPA / Reels</div>
                          <div className="text-sm font-bold text-white mt-0.5">3.6x ROAS</div>
                          <div className="text-[10px] text-emerald-400">Target CPA $18.50</div>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400 font-mono">Google PMax & Search</div>
                          <div className="text-sm font-bold text-white mt-0.5">4.4x ROAS</div>
                          <div className="text-[10px] text-emerald-400">75%+ Impression Share</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Growth Insight Banner (Always visible in dashboard) */}
                <div className="p-3 rounded-xl bg-orange-950/30 border border-orange-500/30 flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-300">Active AI Growth Directive</span>
                      <span className="text-[10px] font-mono text-orange-400">High Confidence</span>
                    </div>
                    <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">
                      “Your highest-potential opportunity is improving conversion on high-traffic product pages. Updating SKU #301 is projected to generate +$14,600/mo.”
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Status Strip */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>8 AI Agents Synchronized</span>
                </div>
                <button
                  onClick={onOpenProductDemo}
                  className="text-orange-400 hover:text-orange-300 font-medium hover:underline flex items-center gap-1"
                >
                  <span>Launch Interactive Simulator</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
