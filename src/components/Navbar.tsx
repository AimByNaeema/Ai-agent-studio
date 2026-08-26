import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, User, Globe, Search, Megaphone, Zap, BarChart3, FileEdit, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenGetStarted?: () => void;
  onOpenLogin?: () => void;
  onOpenDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Platform', href: '/platform' },
    { name: 'Solutions', href: '/solutions', hasDropdown: true },
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Resources', href: '/resources' },
  ];

  const solutionItems = [
    {
      title: 'Product Research',
      desc: 'Score margin whitespace & supplier costs',
      icon: Zap,
      href: '/solutions?tab=product-research',
    },
    {
      title: 'Global Market Intelligence',
      desc: 'Discover cross-border regional demand',
      icon: Globe,
      href: '/solutions?tab=global-markets',
    },
    {
      title: 'SEO & Search Rankings',
      desc: 'Recover decaying keywords & organic clicks',
      icon: Search,
      href: '/solutions?tab=seo',
    },
    {
      title: 'Listing & Catalog Optimizer',
      desc: 'AI copywriting & conversion rate lifts',
      icon: FileEdit,
      href: '/solutions?tab=listing-optimization',
    },
    {
      title: 'Marketing Strategy Playbooks',
      desc: 'Omnichannel promo planning & retention',
      icon: Megaphone,
      href: '/solutions?tab=marketing',
    },
    {
      title: 'Social & Advertising',
      desc: 'Viral creative hooks & multi-ad testing',
      icon: Sparkles,
      href: '/solutions?tab=social-ads',
    },
    {
      title: 'Analytics & Telemetry',
      desc: 'Real-time revenue diagnostics & ROI',
      icon: BarChart3,
      href: '/solutions?tab=analytics',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-slate-950/20 py-3.5'
          : 'bg-slate-950/95 md:bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Wordmark */}
          <Link
            id="brand-logo-link"
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-bold text-lg group-hover:bg-orange-600 transition-colors">
              <span className="font-mono text-base tracking-tighter">AI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5 font-sans">
                AI AGENT <span className="text-orange-500 text-xs sm:text-sm font-extrabold uppercase px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/30">STUDIO</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">
                Intelligent Growth Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <div key={link.name} className="relative group">
                  <Link
                    id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    to={link.href}
                    className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                      active
                        ? 'text-orange-400 bg-slate-900 border border-slate-800/80 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown for Solutions */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl shadow-slate-950/60 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 transform group-hover:translate-y-0 translate-y-1 z-50">
                      <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 mb-1">
                        Use Cases & Solutions
                      </div>
                      <div className="space-y-0.5 max-h-[380px] overflow-y-auto">
                        {solutionItems.map((item, idx) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={idx}
                              to={item.href}
                              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group/item"
                            >
                              <div className="p-1.5 rounded-md bg-slate-950 text-orange-400 border border-slate-800 group-hover/item:border-orange-500/40 shrink-0 mt-0.5">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white group-hover/item:text-orange-400 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-slate-400 leading-tight">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="mt-1 pt-2 border-t border-slate-800 px-2 pb-1">
                        <Link
                          to="/solutions"
                          className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold flex items-center justify-between"
                        >
                          <span>Explore All Solutions Hub</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              id="btn-nav-login"
              to="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                location.pathname === '/login'
                  ? 'text-white bg-slate-800 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              Login
            </Link>
            <Link
              id="btn-nav-get-started"
              to="/get-started"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg shadow-md shadow-orange-500/25 transition-all duration-150 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              id="btn-mobile-get-started"
              to="/get-started"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md shadow-sm"
            >
              Start
            </Link>
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="sm:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-150"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  isActive(link.href)
                    ? 'text-orange-400 bg-slate-900 border border-slate-800 font-semibold'
                    : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg text-center border border-slate-800 flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Login to Console</span>
            </Link>
            <Link
              to="/get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
