import React from 'react';
import { Hero } from '../components/Hero';
import { PlatformSection } from '../components/PlatformSection';
import { GlobalMarketSection } from '../components/GlobalMarketSection';
import { ProductResearchSection } from '../components/ProductResearchSection';
import { WorkflowSection } from '../components/WorkflowSection';
import { SecurityControlSection, CostEfficiencySection } from '../components/SecurityControlSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const HomePage: React.FC = () => {
  usePageMetadata({
    title: 'AI AGENT STUDIO | AI Digital Employees & Websites Built for Modern Businesses',
    description: 'We build custom AI agents, professional websites, ecommerce systems, automation workflows, and digital tools designed around the needs of each business.',
  });

  return (
    <div className="text-white">
      {/* 1. Hero Section: Core Brand Identity & Coordinated Workspace */}
      <Hero />

      {/* 2. Services Section: What We Do */}
      <PlatformSection />

      {/* 3. AI Digital Employees by Industry Vertical */}
      <GlobalMarketSection />

      {/* 4. Selected Projects & Portfolio */}
      <ProductResearchSection />

      {/* 5. How We Work: 6-Step Engineering Lifecycle */}
      <WorkflowSection />

      {/* 6. Security, Trust & Human Approval Controls */}
      <SecurityControlSection />

      {/* 7. Engineering Performance Standards (Sub-Second Speed, Mobile First, SEO) */}
      <CostEfficiencySection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Final High-Impact Call to Action */}
      <FinalCtaSection />
    </div>
  );
};
