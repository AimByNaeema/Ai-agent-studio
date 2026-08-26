import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Store,
  Globe,
  Zap,
  DollarSign,
  Sparkles,
  Lock,
  Building,
  Check
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PRICING_PLANS } from '../data/mockData';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const GetStartedPage: React.FC = () => {
  usePageMetadata({
    title: 'Get Started: 14-Day Free Evaluation & Onboarding',
    description: 'Connect your storefront, configure your growth priorities, and deploy 8 synchronized AI growth agents in under 2 minutes.',
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPlanId = searchParams.get('plan') || 'growth';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [storePlatform, setStorePlatform] = useState<string>('Shopify');
  const [storeUrl, setStoreUrl] = useState<string>('apex-lifestyle.myshopify.com');
  const [storeName, setStoreName] = useState<string>('Apex Lifestyle Goods');
  const [workEmail, setWorkEmail] = useState<string>('founder@apex-lifestyle.com');
  const [primaryCategory, setPrimaryCategory] = useState<string>('Home & Lifestyle');
  const [monthlyGmv, setMonthlyGmv] = useState<string>('$100k - $250k');
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['North America', 'Europe']);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([
    'Listing Conversion Lift',
    'SEO Ranking Recovery',
    'Catalog Whitespace Discovery',
  ]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[1];

  const handleToggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      if (selectedRegions.length > 1) {
        setSelectedRegions(selectedRegions.filter(r => r !== region));
      }
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const handleToggleObjective = (obj: string) => {
    if (selectedObjectives.includes(obj)) {
      if (selectedObjectives.length > 1) {
        setSelectedObjectives(selectedObjectives.filter(o => o !== obj));
      }
    } else {
      setSelectedObjectives([...selectedObjectives, obj]);
    }
  };

  const handleLaunchEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      setTimeout(() => {
        navigate('/platform');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-[90vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Get Started & Store Setup' }]} />

        {/* Page Header */}
        <div className="pt-4 pb-8 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>14-Day Free Evaluation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Launch Your AI Ecommerce <span className="text-orange-500">Growth Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Connect your catalog in 60 seconds with read-only scopes. No credit card required.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
            {[
              { num: 1, label: '1. Storefront' },
              { num: 2, label: '2. Catalog & Market' },
              { num: 3, label: '3. Objectives' },
              { num: 4, label: '4. Evaluation' },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num)}
                className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                  currentStep === s.num
                    ? 'bg-orange-500 border-orange-400 text-white font-bold shadow-md shadow-orange-500/20'
                    : currentStep > s.num
                    ? 'bg-slate-900 border-emerald-500/40 text-emerald-400 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Completion Success State */}
        {isCompleted ? (
          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Store Connection Initialized!</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your 14-day evaluation for <span className="text-orange-400 font-bold">{storeName}</span> on the <span className="text-white font-bold">{selectedPlan.name} Plan</span> is active. Autonomous research and listing scans are running in read-only sandbox mode.
            </p>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-2">
              <span>Redirecting to Growth Console telemetry...</span>
            </div>
          </div>
        ) : (
          /* Multi-Step Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Interactive Wizard Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4 text-left">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Step 01 of 04</span>
                    <h3 className="text-lg font-bold text-white">Connect Your Storefront</h3>
                    <p className="text-xs text-slate-400">Select your ecommerce platform and enter store coordinates.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Primary Commerce Platform</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Shopify', 'Amazon Seller', 'WooCommerce', 'BigCommerce'].map((plat) => (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => setStorePlatform(plat)}
                          className={`p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center ${
                            storePlatform === plat
                              ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {plat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Storefront URL / Subdomain</label>
                    <div className="flex rounded-lg border border-slate-700 bg-slate-950 overflow-hidden">
                      <span className="bg-slate-800 px-3 py-2 text-xs text-slate-400 font-mono border-r border-slate-700">
                        https://
                      </span>
                      <input
                        type="text"
                        value={storeUrl}
                        onChange={(e) => setStoreUrl(e.target.value)}
                        placeholder="your-brand.myshopify.com"
                        className="w-full px-3 py-2 text-xs text-white bg-slate-950 focus:outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Brand / Store Name</label>
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="e.g. Apex Lifestyle"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Work Email for Telemetry</label>
                      <input
                        type="email"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="founder@yourbrand.com"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Protected by Read-Only Scopes. No live store changes without explicit approval.</span>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-xs text-white flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Continue to Catalog Specs</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4 text-left">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Step 02 of 04</span>
                    <h3 className="text-lg font-bold text-white">Catalog & Target Markets</h3>
                    <p className="text-xs text-slate-400">Help the AI agents calibrate demand benchmarks to your category.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Primary Category</label>
                      <select
                        value={primaryCategory}
                        onChange={(e) => setPrimaryCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="Home & Lifestyle">Home & Lifestyle</option>
                        <option value="Consumer Electronics">Consumer Electronics</option>
                        <option value="Beauty & Skincare">Beauty & Skincare</option>
                        <option value="Apparel & Fashion">Apparel & Fashion</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Pet Supplies">Pet Supplies</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Current Monthly GMV</label>
                      <select
                        value={monthlyGmv}
                        onChange={(e) => setMonthlyGmv(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="Under $25k">Under $25,000 / mo</option>
                        <option value="$25k - $100k">$25,000 - $100,000 / mo</option>
                        <option value="$100k - $250k">$100,000 - $250,000 / mo</option>
                        <option value="$250k - $1M">$250,000 - $1,000,000 / mo</option>
                        <option value="$1M+">$1,000,000+ / mo</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">Target Geographic Markets to Scan</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['North America', 'Europe', 'United Kingdom', 'Japan & APAC', 'Australia', 'Middle East'].map((reg) => {
                        const isSelected = selectedRegions.includes(reg);
                        return (
                          <button
                            key={reg}
                            type="button"
                            onClick={() => handleToggleRegion(reg)}
                            className={`p-2 rounded-lg border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-orange-500/10 border-orange-500 text-orange-400 font-semibold'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span>{reg}</span>
                            {isSelected && <Check className="w-3 h-3 text-orange-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-400 hover:text-white border border-slate-800"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-xs text-white flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Continue to Objectives</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4 text-left">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Step 03 of 04</span>
                    <h3 className="text-lg font-bold text-white">Prioritize Growth Objectives</h3>
                    <p className="text-xs text-slate-400">Select which autonomous workflows you want to run first.</p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { id: 'Listing Conversion Lift', desc: 'Rewriting titles, bullet points, and descriptions for +0.8% - +1.4% CR lift' },
                      { id: 'SEO Ranking Recovery', desc: 'Clustering non-branded commercial buyer queries and recapturing decaying search positions' },
                      { id: 'Catalog Whitespace Discovery', desc: 'Scanning competitor customer reviews and supplier pricing for high-margin SKU additions' },
                      { id: 'Omnichannel Ad ROAS Diagnostics', desc: 'Auditing ad sets on Meta & TikTok to identify creative fatigue and reduce CPA' },
                      { id: 'Lapsed Customer Reactivation', desc: 'Automated 14-day promotional playbook cadence for 60-90 day inactive buyers' },
                    ].map((obj) => {
                      const isSelected = selectedObjectives.includes(obj.id);
                      return (
                        <div
                          key={obj.id}
                          onClick={() => handleToggleObjective(obj.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'bg-orange-500/10 border-orange-500 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                            isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-700 bg-slate-900'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{obj.id}</div>
                            <div className="text-[11px] text-slate-400 leading-snug">{obj.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-400 hover:text-white border border-slate-800"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-xs text-white flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Continue to Plan Selection</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <form onSubmit={handleLaunchEvaluation} className="space-y-5 text-left">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Step 04 of 04</span>
                    <h3 className="text-lg font-bold text-white">Confirm Plan & Launch Evaluation</h3>
                    <p className="text-xs text-slate-400">14-day full access evaluation. You will not be billed during the trial.</p>
                  </div>

                  {/* Plan Cards Switcher */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {PRICING_PLANS.map((plan) => {
                      const isSelected = plan.id === selectedPlanId;
                      const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-orange-500/10 border-orange-500 text-white shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <span className="text-[11px] font-bold text-white block">{plan.name}</span>
                            <span className="text-base font-bold text-orange-400 font-mono mt-0.5 block">${price}/mo</span>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono block mt-2">14-Day Free</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-mono text-[11px]">Selected Tier</span>
                      <span className="font-bold text-white">{selectedPlan.name} Plan</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-mono text-[11px]">Trial Duration</span>
                      <span className="font-bold text-emerald-400">14 Days Free Access</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-mono text-[11px]">Security Gate</span>
                      <span className="text-slate-300">Human Approval Enabled</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-400 hover:text-white border border-slate-800"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 font-bold text-xs text-white flex items-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Initializing 8 AI Agents...</span>
                      ) : (
                        <>
                          <span>Start 14-Day Evaluation Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Summary & Live Simulated Audit Card */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs text-white font-bold">Onboarding Overview</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Live Preview</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Storefront:</span>
                    <span className="font-bold text-white font-mono">{storeName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Platform:</span>
                    <span className="text-slate-200 font-semibold">{storePlatform}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Category:</span>
                    <span className="text-slate-200">{primaryCategory}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Target Regions:</span>
                    <span className="text-orange-400 font-mono">{selectedRegions.length} Regions Active</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Active Objectives:</span>
                    <span className="text-emerald-400 font-mono">{selectedObjectives.length} Selected</span>
                  </div>
                </div>

                {/* Simulated AI Growth Scorecard */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-orange-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-orange-400 font-bold">Simulated Growth Potential</span>
                    <span className="font-mono text-[10px] text-emerald-400">+23.4% Lift</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    "Based on {primaryCategory} benchmark data, activating SEO & Listing Optimization is projected to generate +$14,600 in net gross profit within 30 days."
                  </p>
                </div>

                <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-1">
                  <span>Zero Lock-in Contract</span>
                  <span>SOC2 Type II Aligned</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
