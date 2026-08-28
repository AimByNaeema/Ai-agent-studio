export interface Capability {
  id: string;
  number: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  category: string;
  sampleInput: string;
  aiOutput: string;
  keyBenefits: string[];
}

export interface MarketRegion {
  id: string;
  name: string;
  code: string;
  flag: string;
  demandIndex: number;
  competition: 'Low' | 'Moderate' | 'High' | 'Very High';
  trendVelocity: string;
  avgOrderValue: string;
  topNiches: string[];
  topProductOpportunity: string;
  opportunityScore: number;
  regulatoryNote: string;
}

export interface ProductOpportunity {
  id: string;
  title: string;
  category: string;
  opportunityScore: number;
  demandLevel: 'High' | 'Very High' | 'Surging';
  competition: 'Low' | 'Medium' | 'High';
  marketFit: number;
  trend: string;
  marginPotential: string;
  costEstimate: string;
  suggestedRetail: string;
  risk: 'Low' | 'Moderate' | 'Calculated';
  monthlySearchVolume: string;
  growthYoY: string;
  keyDifferentiator: string;
}

export interface SeoListingItem {
  id: string;
  productName: string;
  category: string;
  primaryKeyword: string;
  searchVolume: string;
  searchIntent: 'Commercial Investigation' | 'High Purchase Intent' | 'Informational';
  keywordDifficulty: 'Low (24)' | 'Medium (42)' | 'High (68)';
  before: {
    title: string;
    description: string;
    bulletPoints: string[];
    readabilityScore: number;
    seoScore: number;
    keywordDensity: string;
  };
  after: {
    title: string;
    description: string;
    bulletPoints: string[];
    readabilityScore: number;
    seoScore: number;
    keywordDensity: string;
    improvements: string[];
    projectedCtrLift: string;
  };
}

export interface MarketingCampaign {
  id: string;
  title: string;
  audience: string;
  offer: string;
  campaignType: string;
  primaryChannel: string;
  contentAngle: string;
  ctaText: string;
  targetKpi: string;
  projectedRoas: string;
  budgetRecommendation: string;
  timeline: string;
}

export interface SocialAdPlatform {
  id: string;
  name: string;
  platformType: 'Organic & Paid' | 'Search & Intent' | 'Short-Form Video' | 'Visual Discovery';
  recommendedFormat: string;
  contentIdea: string;
  adConcept: string;
  creativeDirection: string;
  targetMetric: string;
  benchmarkRoas: string;
  status: 'Analysis Ready' | 'Strategy Configured';
}

export interface AnalyticsData {
  timeframe: '7D' | '30D' | '90D' | '1Y';
  revenue: string;
  revenueChange: string;
  orders: string;
  ordersChange: string;
  conversionRate: string;
  conversionChange: string;
  aov: string;
  aovChange: string;
  chartData: { label: string; revenue: number; orders: number; cr: number }[];
  topProducts: { name: string; sales: string; growth: string; share: number }[];
  aiInsight: {
    headline: string;
    summary: string;
    actionLabel: string;
    impactScore: string;
    confidence: string;
  };
}

export interface WorkflowStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  isApprovalGate?: boolean;
  tag: string;
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  badge?: string;
  description: string;
  features: string[];
  cta: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  merchantCategory: string;
  metricsResult: string;
  role: string;
  avatarInitials: string;
  businessScale: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Overview' | 'Operations & Approval' | 'Security' | 'Pricing';
}

// ==========================================
// Backend & Database Entity Types (Firestore)
// ==========================================

export type UserRole = 'admin' | 'staff';

export interface AdminProfile {
  id: string;
  full_name: string | null;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type ServiceInterest =
  | 'custom_ai_agent'
  | 'web_development'
  | 'ecommerce_solution'
  | 'ai_automation'
  | 'custom_digital_solution'
  | 'other';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal_sent'
  | 'closed'
  | 'archived';

export interface ProjectLead {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  company_name?: string | null;
  website_url?: string | null;
  service_interest: ServiceInterest;
  business_industry?: string | null;
  project_budget?: string | null;
  project_timeline?: string | null;
  message: string;
  source_page: string;
  status: LeadStatus;
  internal_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectLeadSubmission {
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  website_url?: string;
  service_interest: ServiceInterest;
  business_industry?: string;
  project_budget?: string;
  project_timeline?: string;
  message: string;
  source_page?: string;
}

export type ProjectStatus =
  | 'in_development'
  | 'coming_soon'
  | 'live'
  | 'available_for_custom_projects'
  | 'concept'
  | 'archived';

export interface ProjectRecord {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  full_description: string;
  category: string;
  status: ProjectStatus;
  technologies: string[];
  featured: boolean;
  cover_image_url?: string | null;
  project_url?: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceRecord {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  icon_key: string;
  key_features?: string[];
  deliverables?: string[];
  is_available_for_custom_projects: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AgentCategoryRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriberRecord {
  id: string;
  email: string;
  consent_at: string;
  source_page: string;
  created_at: string;
  is_active: boolean;
}
