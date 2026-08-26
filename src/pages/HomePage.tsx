import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { PlatformSection } from '../components/PlatformSection';
import { GlobalMarketSection } from '../components/GlobalMarketSection';
import { ProductResearchSection } from '../components/ProductResearchSection';
import { SeoListingSection } from '../components/SeoListingSection';
import { MarketingSection } from '../components/MarketingSection';
import { SocialAdsSection } from '../components/SocialAdsSection';
import { AnalyticsSection } from '../components/AnalyticsSection';
import { WorkflowSection } from '../components/WorkflowSection';
import { SecurityControlSection, CostEfficiencySection } from '../components/SecurityControlSection';
import { PricingSection } from '../components/PricingSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { GetStartedModal, LoginModal, ToastNotification } from '../components/Modals';
import { PricingPlan } from '../types';
import { PRICING_PLANS } from '../data/mockData';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const HomePage: React.FC = () => {
  usePageMetadata({
    title: 'AI AGENT STUDIO | Autonomous Intelligence Platform',
    description: 'An intelligent AI ecommerce growth platform that researches markets, discovers products, optimizes SEO and listings, plans marketing, analyzes advertising, and drives smarter growth decisions.',
  });

  const navigate = useNavigate();
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(PRICING_PLANS[1]);
  const [isAnnualPlan, setIsAnnualPlan] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenGetStarted = (plan?: PricingPlan, isAnnual: boolean = true) => {
    setSelectedPlan(plan || PRICING_PLANS[1]);
    setIsAnnualPlan(isAnnual);
    setGetStartedOpen(true);
  };

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4500);
  };

  return (
    <div className="text-white">
      {/* 1. Hero Section */}
      <Hero
        onStartGrowing={() => navigate('/get-started')}
        onExplorePlatform={() => navigate('/platform')}
        onOpenProductDemo={() => handleScrollTo('product-research')}
      />

      {/* 2. Platform 8 Capabilities Section */}
      <PlatformSection />

      {/* 3. Global Market Intelligence Section */}
      <GlobalMarketSection />

      {/* 4. Product Research & Whitespace Section */}
      <ProductResearchSection />

      {/* 5. SEO + Listing Optimization Split Section */}
      <SeoListingSection />

      {/* 6. Marketing Strategy & Playbook Planning Section */}
      <MarketingSection />

      {/* 7. Social & Omnichannel Advertising Section */}
      <SocialAdsSection />

      {/* 8. Unified Analytics & AI Growth Diagnostics Section */}
      <AnalyticsSection />

      {/* 9. AI Workflow 8-Stage Pipeline Section */}
      <WorkflowSection />

      {/* 10. Security & Human Approval Section */}
      <SecurityControlSection />

      {/* 11. Token & Cost Efficiency Section */}
      <CostEfficiencySection />

      {/* 12. Transparent Commercial Pricing Section */}
      <PricingSection
        onSelectPlan={(plan, isAnnual) => {
          navigate('/pricing');
        }}
      />

      {/* 13. Testimonials (Demonstration Feedback) */}
      <TestimonialsSection />

      {/* 14. Frequently Asked Questions (FAQ) */}
      <FaqSection />

      {/* 15. Final High-Impact CTA Section */}
      <FinalCtaSection
        onStartGrowing={() => navigate('/get-started')}
        onExplorePlatform={() => navigate('/platform')}
      />

      {/* Interactive Modals & Toasts */}
      <GetStartedModal
        isOpen={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
        selectedPlan={selectedPlan}
        isAnnual={isAnnualPlan}
        onSuccess={(msg) => showToast(msg)}
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
