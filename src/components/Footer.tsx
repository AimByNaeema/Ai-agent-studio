import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '../lib/firebase';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribing(true);
    setSubscribeStatus(null);

    try {
      const res = await subscribeNewsletter(newsletterEmail, 'footer');
      setSubscribeStatus({ success: res.success, message: res.message });
      if (res.success) {
        setNewsletterEmail('');
      }
    } catch (err) {
      setSubscribeStatus({ success: false, message: 'Subscription failed. Please try again.' });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Overview & Newsletter */}
          <div className="col-span-2 space-y-4 text-left">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-base font-mono group-hover:bg-orange-600 transition-colors">
                AI
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AI AGENT <span className="text-orange-500 text-xs uppercase px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/30">STUDIO</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Intelligent AI agents, professional websites, and custom digital systems designed around the specific needs of modern businesses.
            </p>
            <div className="flex flex-col gap-1 text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>All Systems Operational (99.99% SLA)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 pt-0.5">
                <span>Inquiries:</span>
                <a href="mailto:aiagentstudioo@gmail.com" className="text-orange-400 hover:underline font-mono">
                  aiagentstudioo@gmail.com
                </a>
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="pt-2 max-w-sm">
              <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                Stay updated on AI systems & product briefs:
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter work email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shrink-0 cursor-pointer disabled:opacity-50 transition-all"
                >
                  {isSubscribing ? '...' : 'Subscribe'}
                </button>
              </form>
              {subscribeStatus && (
                <div className={`mt-1.5 text-[11px] flex items-center gap-1 ${subscribeStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {subscribeStatus.success ? <CheckCircle2 className="w-3 h-3 shrink-0" /> : <AlertCircle className="w-3 h-3 shrink-0" />}
                  <span>{subscribeStatus.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 3: Services & Capabilities */}
          <div className="space-y-3 text-left">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Capabilities</div>
            <ul className="space-y-2">
              <li><Link to="/platform" className="hover:text-white transition-colors">Custom AI Agents</Link></li>
              <li><Link to="/platform" className="hover:text-white transition-colors">Website Building</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Ecommerce Growth AI</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Business Automation</Link></li>
              <li><Link to="/platform#capabilities" className="hover:text-white transition-colors">9 Sub-Agents Graph</Link></li>
            </ul>
          </div>

          {/* Col 4: Solutions */}
          <div className="space-y-3 text-left">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Solutions</div>
            <ul className="space-y-2">
              <li><Link to="/solutions?tab=product-research" className="hover:text-white transition-colors">Product Research</Link></li>
              <li><Link to="/solutions?tab=website-building" className="hover:text-white transition-colors">Website Building</Link></li>
              <li><Link to="/solutions?tab=global-markets" className="hover:text-white transition-colors">Global Markets</Link></li>
              <li><Link to="/solutions?tab=seo" className="hover:text-white transition-colors">SEO Optimization</Link></li>
              <li><Link to="/solutions?tab=listing-optimization" className="hover:text-white transition-colors">Listing Optimizer</Link></li>
              <li><Link to="/solutions?tab=marketing" className="hover:text-white transition-colors">Marketing Playbooks</Link></li>
            </ul>
          </div>

          {/* Col 5: Security & Trust */}
          <div className="space-y-3 text-left">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Security & Trust</div>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Human Approval Gates</Link></li>
              <li><Link to="/platform" className="hover:text-white transition-colors">Read-Only Scopes</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Immutable Audit Logs</Link></li>
              <li><Link to="/platform" className="hover:text-white transition-colors">Zero LLM Data Training</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Architecture Whitepaper</Link></li>
            </ul>
          </div>

          {/* Col 6: Resources & Auth */}
          <div className="space-y-3 text-left">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Portal & CRM</div>
            <ul className="space-y-2">
              <li><Link to="/resources" className="hover:text-white transition-colors">Resource Hub & Guides</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Plans & Custom Pricing</Link></li>
              <li><Link to="/get-started" className="hover:text-white transition-colors">Start a Project</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Merchant Login</Link></li>
              <li><Link to="/admin" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors flex items-center gap-1">Admin Portal <span className="text-[10px] font-mono px-1 rounded bg-orange-500/20">CRM</span></Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 AI AGENT STUDIO. All rights reserved. Built for modern businesses.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>256-Bit TLS Encryption</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Cloud Firestore Secured</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
