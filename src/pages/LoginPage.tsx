import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Key,
  User,
  Store,
  AlertCircle
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const LoginPage: React.FC = () => {
  usePageMetadata({
    title: 'Merchant Login | Growth Console',
    description: 'Sign in to access your autonomous AI Growth Console, review staged recommendations, and inspect real-time storefront telemetry.',
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeDomain, setStoreDomain] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatusMessage('Please enter your work email and password.');
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage('Authentication verified! Redirecting to Growth Console...');
      setTimeout(() => {
        navigate('/platform');
      }, 1200);
    }, 900);
  };

  const handleFillDemo = () => {
    setEmail('founder@apex-lifestyle.com');
    setPassword('demo-growth-2026');
    setStoreDomain('apex-lifestyle.myshopify.com');
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-[85vh] flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Breadcrumbs items={[{ label: 'Merchant Login' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6">
          {/* Left Branded Value Sidebar */}
          <div className="lg:col-span-5 space-y-6 text-left hidden lg:block">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-lg font-mono text-white shadow-lg shadow-orange-500/20">
              AI
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Access Your AI Growth Console
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                Review staged recommendations, authorize listing updates with one-click approval, and monitor multi-channel conversion telemetry in real time.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Human-in-the-Loop Safe</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Read-only scopes protect your catalog. Zero modifications occur without your approval.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>8 Coordinated AI Sub-Agents</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Real-time telemetry across Shopify, Amazon, Meta, and Google.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 1.3 256-Bit Cryptographic Session</span>
            </div>
          </div>

          {/* Right Login Form Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Sign In to Store Console</h2>
                  <span className="text-xs text-slate-400">Enter your merchant credentials</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-mono font-semibold transition-colors cursor-pointer"
                >
                  ⚡ Autofill Demo
                </button>
              </div>

              {/* Status or Validation Banner */}
              {statusMessage && (
                <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                  statusMessage.includes('verified')
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border border-red-500/30 text-red-300'
                }`}>
                  {statusMessage.includes('verified') ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* SSO Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Shopify Login</span>
                </button>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  <span>Google Workspace</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center text-[10px] font-mono uppercase text-slate-500">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-900 px-3 z-10">or work email</span>
                <div className="border-t border-slate-800 w-full" />
              </div>

              {/* Standard Form */}
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="founder@yourbrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Password
                    </label>
                    <a href="#" className="text-[11px] text-orange-400 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Storefront Subdomain (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="yourbrand.myshopify.com"
                    value={storeDomain}
                    onChange={(e) => setStoreDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-orange-500 focus:ring-orange-500"
                    />
                    <span>Remember this device for 30 days</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 font-bold text-xs text-white shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Verifying Session...</span>
                  ) : (
                    <>
                      <span>Sign In to Console</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800">
                <span>New ecommerce merchant? </span>
                <Link to="/get-started" className="text-orange-400 hover:underline font-semibold">
                  Start 14-Day Free Evaluation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
