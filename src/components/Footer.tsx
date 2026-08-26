import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Overview */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-base font-mono group-hover:bg-orange-600 transition-colors">
                AI
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AI AGENT <span className="text-orange-500 text-xs uppercase px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/30">STUDIO</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The unified AI growth platform for high-velocity modern ecommerce brands. Researches global markets, finds product whitespace, optimizes listings, and coordinates high-ROAS marketing campaigns.
            </p>
            <div className="flex flex-col gap-1 text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>All Systems Operational (99.99% SLA)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 pt-0.5">
                <span>Support:</span>
                <a href="mailto:aiagentstudioo@gmail.com" className="text-orange-400 hover:underline font-mono">
                  aiagentstudioo@gmail.com
                </a>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/get-started"
                className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold text-xs"
              >
                <span>Start 14-Day Free Evaluation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Col 3: Product */}
          <div className="space-y-3">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Platform</div>
            <ul className="space-y-2">
              <li><Link to="/platform" className="hover:text-white transition-colors">Platform Architecture</Link></li>
              <li><Link to="/platform#capabilities" className="hover:text-white transition-colors">8 AI Sub-Agents</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Feature Matrix</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">9-Stage Workflow</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Commercial Plans</Link></li>
            </ul>
          </div>

          {/* Col 4: Solutions */}
          <div className="space-y-3">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Solutions</div>
            <ul className="space-y-2">
              <li><Link to="/solutions?tab=product-research" className="hover:text-white transition-colors">Product Research</Link></li>
              <li><Link to="/solutions?tab=global-markets" className="hover:text-white transition-colors">Global Markets</Link></li>
              <li><Link to="/solutions?tab=seo" className="hover:text-white transition-colors">SEO & Search Ranks</Link></li>
              <li><Link to="/solutions?tab=listing-optimization" className="hover:text-white transition-colors">Listing Optimizer</Link></li>
              <li><Link to="/solutions?tab=marketing" className="hover:text-white transition-colors">Marketing Playbooks</Link></li>
              <li><Link to="/solutions?tab=analytics" className="hover:text-white transition-colors">Unified Analytics</Link></li>
            </ul>
          </div>

          {/* Col 5: Security & Trust */}
          <div className="space-y-3">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Security & Trust</div>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Human Approval Gates</Link></li>
              <li><Link to="/platform" className="hover:text-white transition-colors">Read-Only Scopes</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Immutable Audit Logs</Link></li>
              <li><Link to="/platform" className="hover:text-white transition-colors">Zero LLM Data Training</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Security Whitepapers</Link></li>
            </ul>
          </div>

          {/* Col 6: Resources & Auth */}
          <div className="space-y-3">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Resources</div>
            <ul className="space-y-2">
              <li><Link to="/resources" className="hover:text-white transition-colors">Resource Hub & Guides</Link></li>
              <li><Link to="/resources?category=ai-guides" className="hover:text-white transition-colors">AI Best Practices</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & ROI Calculator</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Merchant Login</Link></li>
              <li><Link to="/get-started" className="hover:text-white transition-colors">Store Onboarding</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 AI AGENT STUDIO. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>256-Bit TLS Encryption</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Human Approval Certified</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
