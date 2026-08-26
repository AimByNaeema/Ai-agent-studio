import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Globe,
  Zap,
  Search,
  FileEdit,
  Megaphone,
  Sparkles,
  TrendingUp,
  BarChart3,
  Layout,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Layers,
  ChevronRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MARKET_REGIONS, PRODUCT_OPPORTUNITIES } from '../data/mockData';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const SolutionsPage: React.FC = () => {
  usePageMetadata({
    title: 'Ecommerce Solutions & AI Use Cases',
    description: 'Explore tailored AI ecommerce solutions for Website Building, Product Research, Global Markets, SEO, Listing Optimization, Omnichannel Marketing, Social Advertising, and Analytics.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const solutions = [
    {
      id: 'website-building',
      title: 'Website Building',
      subtitle: 'High-Converting Storefronts, Landing Pages & Site Architecture',
      icon: Layout,
      category: 'Storefront & CRO',
      challenge: 'Generic templates, cluttered checkout flows, slow mobile load times, and poor UX navigation lead to high bounce rates and low visitor-to-buyer conversion.',
      aiSolution: 'Designs conversion-focused ecommerce storefronts, high-impact landing pages, optimized product & collection pages, and responsive mobile layouts with actionable UX audit recommendations.',
      metricHighlight: { label: 'Mobile Conversion Rate', value: '+1.6% Avg Lift' },
      secondaryMetric: { label: 'UX Friction Reduction', value: '42% Drop-off Fix' },
    },
    {
      id: 'product-research',
      title: 'Product Research',
      subtitle: 'Discover High-Margin Whitespace Before Market Saturation',
      icon: Zap,
      category: 'Catalog Growth',
      challenge: 'Brands struggle with catalog stagnation and high return rates because manual market research takes weeks and relies on outdated Amazon bestseller lists.',
      aiSolution: 'Continuously processes millions of marketplace catalog listings, supplier price sheets, and customer sentiment signals to compute real margin elasticity and whitespace scores.',
      metricHighlight: { label: 'Average Margin Potential', value: '64% Gross' },
      secondaryMetric: { label: 'Whitespace Accuracy', value: '94.2%' },
    },
    {
      id: 'global-markets',
      title: 'Global Market Research',
      subtitle: 'Expand Cross-Border with Localized Demand Intelligence',
      icon: Globe,
      category: 'Cross-Border',
      challenge: 'Expanding into international markets often fails due to unexpected regulatory barriers, differing consumer intent, and fierce unmapped local competitors.',
      aiSolution: 'Analyzes region-by-region purchasing power, tariff and customs dynamics, local search velocity, and consumer sentiment across North America, Europe, UK, Japan, and Australia.',
      metricHighlight: { label: 'International Revenue Lift', value: '+42% YoY' },
      secondaryMetric: { label: 'Top Region Analyzed', value: 'Germany (Score 94)' },
    },
    {
      id: 'seo',
      title: 'SEO & Search Rankings',
      subtitle: 'Recover Lost Organic Rankings & Capture Commercial Search Queries',
      icon: Search,
      category: 'Organic Traffic',
      challenge: 'Algorithmic updates on Google, Amazon A9, and Shopify Search cause sudden traffic decay on high-value organic search terms.',
      aiSolution: 'Continuously monitors index positions, clusters non-branded commercial buyer queries, and automatically drafts high-ranking metadata updates.',
      metricHighlight: { label: 'Projected CTR Lift', value: '+38% Avg' },
      secondaryMetric: { label: 'Keyword Difficulties Mapped', value: 'Low to Surging' },
    },
    {
      id: 'listing-optimization',
      title: 'Listing Optimization',
      subtitle: 'Neuro-Linguistic Copywriting Tailored for Dual Algorithms & Human Buyers',
      icon: FileEdit,
      category: 'Conversion Rate',
      challenge: 'High ad click costs are wasted when product detail pages feature generic bullet points, poor readability, and low emotional urgency.',
      aiSolution: 'Generates structured benefit bullets, lifestyle hooks, clear dimensional specs, and mobile-first micro-copy to boost Add-to-Cart conversions.',
      metricHighlight: { label: 'Conversion Lift', value: '+0.8% to +1.4%' },
      secondaryMetric: { label: 'Readability Score Lift', value: '96/100 (+48 pts)' },
    },
    {
      id: 'marketing',
      title: 'Marketing Strategy',
      subtitle: 'Automated Full-Funnel Promotional Calendars & Retention Sequences',
      icon: Megaphone,
      category: 'Lifecycle & Retention',
      challenge: 'Merchants lack dedicated CMO bandwidth to orchestrate cohesive seasonal flash sales, VIP tiers, and post-purchase win-back sequences.',
      aiSolution: 'Synthesizes store cohort metrics and historical seasonal peaks into complete omnichannel promotional playbooks with multi-stage cadence schedules.',
      metricHighlight: { label: 'Repeat Purchase Rate', value: '+28% Lift' },
      secondaryMetric: { label: 'Projected ROAS', value: '4.8x' },
    },
    {
      id: 'social-media',
      title: 'Social Media',
      subtitle: 'Combat Creative Fatigue with High-Retention Video & Visual Hooks',
      icon: Sparkles,
      category: 'Content & Viral',
      challenge: 'Short-form video algorithms require rapid creative testing; brands burn out attempting to write 20+ viral scripts every week.',
      aiSolution: 'Extracts real customer pain points and objections from reviews to build script angles, 3-second visual hooks, and UGC briefs tailored for TikTok and Instagram Reels.',
      metricHighlight: { label: '3-Sec Hook Retention', value: '62% Avg' },
      secondaryMetric: { label: 'Script Velocity', value: '15 Angles / Min' },
    },
    {
      id: 'advertising',
      title: 'Multichannel Advertising',
      subtitle: 'Real-Time ROAS Diagnostics Across Meta, Google, and TikTok',
      icon: TrendingUp,
      category: 'Paid Acquisition',
      challenge: 'Wasted ad spend on fatigued audiences, overlapping ad sets, and unpredictable cost-per-acquisition (CPA) spikes.',
      aiSolution: 'Audits ad spend distribution against real SKU profit margins, detecting diminishing returns early and reallocating budget to highest-converting creative angles.',
      metricHighlight: { label: 'Blended ROAS', value: '4.2x Target' },
      secondaryMetric: { label: 'CPA Reduction', value: '-22% Avg' },
    },
    {
      id: 'analytics',
      title: 'Analytics & Growth',
      subtitle: 'Root-Cause Diagnostic Intelligence Replacing Confusing Dashboards',
      icon: BarChart3,
      category: 'Executive Insights',
      challenge: 'Merchants drown in raw charts and disparate dashboards without knowing the exact high-leverage action to take next.',
      aiSolution: 'Consolidates storefront orders, traffic sources, inventory turn rates, and ad spends into plain-English diagnostic directives with projected dollar impacts.',
      metricHighlight: { label: 'Identified Net Profit Lift', value: '+$34,800/mo' },
      secondaryMetric: { label: 'Diagnostic Cadence', value: 'Real-Time' },
    },
  ];

  const activeTabId = tabParam && solutions.some(s => s.id === tabParam) ? tabParam : 'product-research';
  const activeSolution = solutions.find(s => s.id === activeTabId) || solutions[0];

  const handleTabChange = (id: string) => {
    setSearchParams({ tab: id });
  };

  const getSolutionIcon = (id: string) => {
    const sol = solutions.find(s => s.id === id);
    if (!sol) return <Zap className="w-4 h-4" />;
    const Icon = sol.icon;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Solutions Hub' }]} />

        {/* Page Header */}
        <div className="pt-6 pb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <Target className="w-3.5 h-3.5" />
            <span>Targeted Commercial Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tailored AI Solutions for <span className="text-orange-500">Every Growth Vector</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Select a solution below to see how AI AGENT STUDIO addresses specific merchant bottlenecks, executes workflows, and delivers measurable profit gains.
          </p>
        </div>

        {/* 8 Solution Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto my-6">
          {solutions.map((sol) => {
            const isSelected = sol.id === activeTabId;
            return (
              <button
                key={sol.id}
                onClick={() => handleTabChange(sol.id)}
                className={`px-3.5 py-2.5 rounded-lg text-xs font-medium shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {getSolutionIcon(sol.id)}
                <span>{sol.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Solution Detail Card */}
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl my-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Specs & Value Prop */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
                  {activeSolution.category} Solution
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeSolution.title}
                </h2>
                <p className="text-sm font-medium text-slate-300">
                  {activeSolution.subtitle}
                </p>
              </div>

              {/* Challenge vs Solution Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-red-500/20 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-red-400 font-bold flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>The Traditional Bottleneck</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeSolution.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>The AI AGENT STUDIO Approach</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeSolution.aiSolution}
                  </p>
                </div>
              </div>

              {/* Metrics Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    {activeSolution.metricHighlight.label}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-orange-400 font-mono mt-0.5 block">
                    {activeSolution.metricHighlight.value}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    {activeSolution.secondaryMetric.label}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono mt-0.5 block">
                    {activeSolution.secondaryMetric.value}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/get-started"
                  className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-xs text-white shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Implement for Your Store</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-4 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium"
                >
                  <span>See How It Works</span>
                </Link>
              </div>
            </div>

            {/* Right Live Visual Simulation Component */}
            <div className="lg:col-span-6 rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-slate-300 font-semibold text-[11px]">
                    Live Solution Artifact
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">Autonomous Feed</span>
              </div>

              {/* Dynamic Sub-View depending on selected solution */}
              {activeSolution.id === 'product-research' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Acoustic MagSafe Desk Partitions</span>
                      <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono text-[10px]">
                        Score: 95/100
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
                      <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Gross Margin</span>
                        <span className="font-bold text-emerald-400 font-mono">68%</span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Search Velocity</span>
                        <span className="font-bold text-orange-400 font-mono">+114% YoY</span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Suppliers</span>
                        <span className="font-bold text-slate-200">3 Verified</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-mono text-[10px] text-orange-400 font-bold block uppercase">
                      AI Opportunity Recommendation
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      "Source 500 test units with integrated cord management channels. Suggested price point: $59.00 against an estimated landed cost of $18.50."
                    </p>
                  </div>
                </div>
              )}

              {activeSolution.id === 'global-markets' && (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    {MARKET_REGIONS.slice(0, 4).map((region) => (
                      <div key={region.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{region.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400">{region.opportunityScore}/100</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{region.topProductOpportunity}</div>
                        <div className="text-[10px] font-mono text-orange-400">{region.trendVelocity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSolution.id === 'seo' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-slate-400 text-[10px]">Target High-Intent Keyword</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                        Difficulty: Low (24)
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">"insulated ceramic coffee travel mug with handle"</div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Monthly Volume: 18,400</span>
                      <span className="text-emerald-400 font-semibold">+38% Projected CTR Lift</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSolution.id === 'listing-optimization' && (
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 space-y-1">
                    <span className="font-mono text-[10px] text-red-400 font-bold">Before: Generic Copy (Score 48/100)</span>
                    <p className="text-slate-400 text-[11px]">"Stainless steel mug. Keeps drinks hot. 16oz size with plastic lid."</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">After: AI Optimized (Score 96/100)</span>
                    <p className="text-slate-200 text-[11px]">"Double-Wall Vacuum Insulated Travel Mug — 12-Hour Thermal Ceramic Interior with Ergonomic Grip & Leak-Proof Lid."</p>
                  </div>
                </div>
              )}

              {activeSolution.id === 'marketing' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">14-Day VIP Lapsed Buyer Reactivation</span>
                      <span className="font-mono text-[10px] text-orange-400">Projected ROAS: 4.8x</span>
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1">
                      <div className="flex items-center gap-1 text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Day 1: Personalized VIP Secret Vault Unlock</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Day 5: Dynamic Bundle Complement based on past SKU</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSolution.id === 'social-media' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                    <span className="font-mono text-[10px] text-orange-400 font-bold uppercase block">
                      TikTok Short-Form UGC Hook Formula
                    </span>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-200 font-mono">
                      "POV: You threw away your 3rd plastic desk organizer and finally upgraded to acoustic modular felt."
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Format: 7-Sec Problem/Solution</span>
                      <span className="text-emerald-400 font-mono">Benchmark ROAS: 3.4x</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSolution.id === 'advertising' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Omnichannel Ad Budget Diagnostic</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Blended ROAS 4.2x</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Meta Advantage+</span>
                        <span className="font-bold text-white">3.8x ROAS</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">Google PMax</span>
                        <span className="font-bold text-white">4.6x ROAS</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSolution.id === 'analytics' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Unified Telemetry Executive Insight</span>
                      <span className="text-orange-400 font-mono text-[10px]">High Impact</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      "Updating product page conversion on your top 3 SKUs accounts for 74% of projected Q3 revenue gains. Zero ad budget increase required."
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Verified with Read-Only Sandbox</span>
                <span>Requires Human Approval</span>
              </div>
            </div>
          </div>
        </div>

        {/* All Solutions Quick Grid */}
        <div className="my-16 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-2xl font-bold text-white">Explore All 8 Commercial Solutions</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Every vector of modern ecommerce performance unified in a single intelligence engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <button
                  key={sol.id}
                  onClick={() => {
                    handleTabChange(sol.id);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all text-left space-y-3 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                      {sol.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {sol.subtitle}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-orange-400 font-semibold flex items-center gap-1">
                    <span>Inspect Solution</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Find Your Highest-ROI Growth Solution</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Connect your store to run an automated diagnostic across all 8 solutions in under 2 minutes.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-sm text-white shadow-lg shadow-orange-500/25 transition-all"
          >
            <span>Start Free Evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
