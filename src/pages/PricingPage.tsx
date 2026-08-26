import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check,
  Zap,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Calculator,
  ChevronDown,
  Lock,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PRICING_PLANS } from '../data/mockData';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const PricingPage: React.FC = () => {
  usePageMetadata({
    title: 'Transparent Commercial Pricing & ROI Plans',
    description: 'Explore transparent pricing plans for Starter, Growth, and Pro tiers. 14-day free trial with read-only scopes. Calculate your projected ROI.',
  });

  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [monthlyRevenue, setMonthlyRevenue] = useState(150000);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // ROI calculations based on average 12-18% revenue lift observed in trials
  const estimatedConversionLift = 0.65; // +0.65% absolute lift
  const projectedMonthlyNetGain = Math.round(monthlyRevenue * 0.14);
  const projectedAnnualNetGain = projectedMonthlyNetGain * 12;

  const fullComparisonMatrix = [
    { category: 'AI Intelligence & Research', features: [
      { name: 'Specialized AI Growth Sub-Agents', starter: '4 Core Agents', growth: 'All 8 Agents', pro: 'All 8 Agents + Custom Logic' },
      { name: 'Active SKU Monitoring Limit', starter: 'Up to 250 SKUs', growth: 'Up to 2,500 SKUs', pro: 'Unlimited SKUs' },
      { name: 'Global Market Whitespace Scans', starter: '2 Regions / mo', growth: 'All 6 Global Regions', pro: 'All Regions + Custom Feeds' },
      { name: 'Competitor Review & Defect Sentiment', starter: 'Basic', growth: 'Full Multi-Store', pro: 'Deep Multi-Platform' },
    ]},
    { category: 'Conversion & Listing Optimization', features: [
      { name: 'SEO & Listing Rewrites / mo', starter: '50 SKUs / mo', growth: '500 SKUs / mo', pro: 'Unlimited Automated' },
      { name: 'Neuro-Linguistic Copywriting Engine', starter: true, growth: true, pro: true },
      { name: 'A/B Test Variant Generation', starter: '2 variants / SKU', growth: '5 variants / SKU', pro: 'Unlimited Multi-Arm' },
      { name: 'Non-Branded Keyword Clustering', starter: true, growth: true, pro: true },
    ]},
    { category: 'Marketing, Ads & Telemetry', features: [
      { name: 'Promotional Playbook Generator', starter: '1 Campaign / mo', growth: 'Unlimited Campaigns', pro: 'Continuous Autonomous' },
      { name: 'Ad Creative Hook & Script Formulas', starter: '10 Hooks / mo', growth: '100 Hooks / mo', pro: 'Unlimited Custom UGC' },
      { name: 'Omnichannel Ad Channel Connections', starter: '1 Ad Account', growth: '4 Ad Accounts', pro: 'Unlimited Multi-Brand' },
      { name: 'Real-Time Revenue Telemetry Diagnostics', starter: 'Daily Batch', growth: '15-Min Real-Time', pro: 'Real-Time Webhooks' },
    ]},
    { category: 'Security & Governance', features: [
      { name: 'Human-in-the-Loop Approval Sandbox', starter: true, growth: true, pro: true },
      { name: 'Read-Only API Scopes Guaranteed', starter: true, growth: true, pro: true },
      { name: 'Cryptographic Audit Trail Logs', starter: '30-Day History', growth: '1-Year History', pro: 'Permanent SOC2 Vault' },
      { name: 'Dedicated Slack Growth Strategist', starter: false, growth: 'Priority Email', pro: 'Dedicated Slack Channel' },
    ]},
  ];

  const pricingFaqs = [
    {
      id: 'faq-1',
      question: 'How does the 14-day free evaluation work?',
      answer: 'You can connect your store with read-only permissions and explore full platform capabilities without paying anything. You will receive an immediate AI growth audit and actionable recommendations. No credit card is charged during the 14-day window.',
    },
    {
      id: 'faq-2',
      question: 'Will the AI make changes to my live store without my knowledge?',
      answer: 'Never. AI AGENT STUDIO is architected with strict Human-in-the-Loop governance. Every recommendation produces a visual side-by-side diff with projected revenue impact that requires your explicit one-click signoff before dispatch.',
    },
    {
      id: 'faq-3',
      question: 'Can I change plans or cancel anytime?',
      answer: 'Yes. You can upgrade, downgrade, or cancel your subscription at any time directly from the merchant console. If you cancel, your store remains active until the end of the billing period with zero penalties.',
    },
    {
      id: 'faq-4',
      question: 'Is my store catalog and sales data kept private?',
      answer: 'Yes. We maintain strict enterprise isolation. Your store data is encrypted with 256-bit TLS in transit and AES-256 at rest. Your proprietary sales and catalog data is NEVER used to train public foundational AI models.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Pricing & Plans' }]} />

        {/* Page Hero */}
        <div className="pt-6 pb-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Commercial Licensing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Transparent Pricing for <span className="text-orange-500">Predictable ROI</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Start with our 14-day free trial. Scale seamlessly as your catalog expands and gross profit compounds.
          </p>

          {/* Billing Interval Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-medium">
            <span className={!isAnnual ? 'text-white font-bold' : 'text-slate-400'}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-slate-800 p-0.5 transition-colors relative border border-slate-700 cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-orange-500 transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={isAnnual ? 'text-white font-bold flex items-center gap-1.5' : 'text-slate-400'}>
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-10 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between space-y-6 transition-all relative ${
                  plan.popular
                    ? 'bg-slate-900 border-orange-500 shadow-2xl shadow-orange-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name} Plan</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="pt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white font-mono">${price}</span>
                    <span className="text-xs text-slate-400 font-mono">/month</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {isAnnual ? 'Billed annually ($' + price * 12 + '/yr)' : 'Billed monthly, cancel anytime'}
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Included Capabilities
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => navigate(`/get-started?plan=${plan.id}&annual=${isAnnual}`)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-center text-[10px] text-slate-500 font-mono mt-2">
                    14-day free trial • No card required
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive ROI Calculator */}
        <div className="my-16 p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-orange-400 font-mono text-xs font-bold uppercase">
                <Calculator className="w-4 h-4" />
                <span>Interactive ROI Estimator</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Estimate Your Net Profit Expansion
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Adjust your current monthly store revenue to see projected profit increases from automated conversion and ROAS optimization.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Projected Annual ROI</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                +${projectedAnnualNetGain.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Monthly Store Revenue (GMV)</span>
                <span className="font-mono font-bold text-white text-base">
                  ${monthlyRevenue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>$10,000/mo</span>
                <span>$500,000/mo</span>
                <span>$1,000,000+/mo</span>
              </div>
            </div>

            <div className="md:col-span-6 grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Est. Monthly Gain</span>
                <div className="text-xl font-bold text-orange-400 font-mono">
                  +${projectedMonthlyNetGain.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">Based on +14% blended efficiency</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Payback Time</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  3.4 Days
                </div>
                <span className="text-[10px] text-slate-500">ROI exceeds Growth tier cost</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Feature Comparison Grid */}
        <div className="my-16 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
              Feature Breakdown
            </span>
            <h2 className="text-2xl font-bold text-white">Full Plan Comparison Matrix</h2>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="py-3 px-4 w-2/5">Plan Features</th>
                  <th className="py-3 px-4 text-center">Starter ($79)</th>
                  <th className="py-3 px-4 text-center text-orange-400 font-bold bg-orange-500/10 rounded-t-lg">
                    Growth ($199)
                  </th>
                  <th className="py-3 px-4 text-center">Pro ($499)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {fullComparisonMatrix.map((section, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <tr className="bg-slate-950">
                      <td colSpan={4} className="py-2.5 px-4 font-mono font-bold text-orange-400 text-[11px] uppercase tracking-wider">
                        {section.category}
                      </td>
                    </tr>
                    {section.features.map((feat, fIdx) => (
                      <tr key={fIdx} className="hover:bg-slate-850/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-200">
                          {feat.name}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-400">
                          {typeof feat.starter === 'boolean' ? (
                            feat.starter ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">—</span>
                          ) : (
                            <span className="font-mono text-[11px]">{feat.starter}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center bg-orange-500/5 text-white font-semibold">
                          {typeof feat.growth === 'boolean' ? (
                            feat.growth ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">—</span>
                          ) : (
                            <span className="font-mono text-[11px] text-orange-400">{feat.growth}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-300">
                          {typeof feat.pro === 'boolean' ? (
                            feat.pro ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">—</span>
                          ) : (
                            <span className="font-mono text-[11px]">{feat.pro}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing FAQ Accordion */}
        <div className="my-16 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold text-white">Frequently Asked Pricing Questions</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear answers to help you select the ideal tier for your store.
            </p>
          </div>

          <div className="space-y-3">
            {pricingFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-orange-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-orange-400' : 'text-slate-500'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-orange-950/40 border border-orange-500/30 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Start Your 14-Day Free Evaluation</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Zero commitment. Read-only scopes. Full access to all 8 specialized growth agents.
          </p>
          <button
            onClick={() => navigate('/get-started')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-sm text-white shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
          >
            <span>Start Free Evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
