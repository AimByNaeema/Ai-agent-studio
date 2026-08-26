import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Lock, Store, Key, AlertCircle } from 'lucide-react';
import { PricingPlan } from '../types';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  isAnnual: boolean;
  onSuccess: (message: string) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  isAnnual,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [storeName, setStoreName] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [platform, setPlatform] = useState('Shopify');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const planTitle = selectedPlan ? selectedPlan.name : 'Growth';
  const planPrice = selectedPlan
    ? isAnnual
      ? selectedPlan.priceAnnual
      : selectedPlan.priceMonthly
    : isAnnual
    ? 63
    : 79;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      onSuccess(`Welcome to AI AGENT STUDIO! Connected ${storeName || 'store'} to the ${planTitle} evaluation.`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        id="get-started-modal-content"
        className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-lg w-full p-6 sm:p-8 text-left relative animate-in fade-in zoom-in-95 duration-150 text-white"
      >
        <button
          id="btn-close-get-started"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-500/20 font-mono">
            EG
          </div>
          <div>
            <div className="text-xs font-mono text-orange-400 font-bold uppercase">
              14-Day Free Evaluation
            </div>
            <h3 className="text-lg font-bold text-white">
              Start Growing with {planTitle} Plan
            </h3>
          </div>
        </div>

        {/* Step Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 font-mono block text-[10px]">Selected Tier</span>
              <span className="font-bold text-white text-sm">{planTitle} Plan</span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-white text-sm">${planPrice}/mo</span>
              <span className="text-[10px] text-slate-400 block">{isAnnual ? 'Billed annually' : 'Billed monthly'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Ecommerce Storefront URL
            </label>
            <div className="flex rounded-lg border border-slate-700 bg-slate-950 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 overflow-hidden">
              <span className="bg-slate-800 px-3 py-2 text-xs text-slate-400 font-mono border-r border-slate-700">
                https://
              </span>
              <input
                id="input-store-url"
                type="text"
                required
                placeholder="your-brand.myshopify.com"
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs text-white bg-slate-950 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Primary Platform
              </label>
              <select
                id="select-platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 text-xs text-white bg-slate-950 rounded-lg border border-slate-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Shopify">Shopify</option>
                <option value="Amazon">Amazon Seller</option>
                <option value="WooCommerce">WooCommerce</option>
                <option value="BigCommerce">BigCommerce</option>
                <option value="Custom API">Custom API</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Store Name
              </label>
              <input
                id="input-store-name"
                type="text"
                placeholder="e.g. Apex Lifestyle"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 text-xs text-white bg-slate-950 placeholder:text-slate-500 rounded-lg border border-slate-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Work Email for Growth Dashboard
            </label>
            <input
              id="input-work-email"
              type="email"
              required
              placeholder="founder@yourbrand.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs text-white bg-slate-950 placeholder:text-slate-500 rounded-lg border border-slate-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Security Notice */}
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold block">Protected by Read-Only Scopes</span>
              <span>No live store changes occur without your explicit approval.</span>
            </div>
          </div>

          <button
            id="btn-submit-get-started"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
          >
            {isLoading ? (
              <span>Initializing Store Sandbox...</span>
            ) : (
              <>
                <span>Launch 14-Day Free Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      onSuccess(`Signed in to AI AGENT STUDIO console as ${email || 'demo user'}.`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        id="login-modal-content"
        className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full p-6 sm:p-8 text-left relative animate-in fade-in zoom-in-95 duration-150 text-white"
      >
        <button
          id="btn-close-login"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-sm font-mono">
            EG
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Merchant Login</h3>
            <span className="text-xs text-slate-400">Access your Growth Console</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Work Email</label>
            <input
              id="input-login-email"
              type="email"
              required
              placeholder="operator@ecommerce.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-white bg-slate-950 placeholder:text-slate-500 rounded-lg border border-slate-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 block">Password</label>
              <a href="#" className="text-[11px] text-orange-400 hover:underline">Forgot?</a>
            </div>
            <input
              id="input-login-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-white bg-slate-950 placeholder:text-slate-500 rounded-lg border border-slate-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <button
            id="btn-submit-login"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mt-2"
          >
            {isLoading ? <span>Verifying...</span> : <span>Sign In to Console</span>}
          </button>

          <div className="text-center text-[11px] text-slate-500 pt-2">
            <span>Demo Console Login • 256-Bit Encrypted Session</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ToastNotification: React.FC<{ message: string | null; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-950 text-white rounded-xl border border-orange-500/40 shadow-2xl p-4 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200">
      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <div className="flex-1 text-xs">
        <div className="font-bold text-orange-300">Action Confirmed</div>
        <p className="text-slate-300 mt-0.5 leading-relaxed">{message}</p>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
