-- ============================================================================
-- AI AGENT STUDIO — Unified Supabase Database Setup & Schema
-- File: supabase/schema.sql
-- Instructions: Run this entire script in your Supabase SQL Editor.
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. PROFILES TABLE (Admins & Staff)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROJECT LEADS TABLE (Contact & Start Your Project Inquiries)
CREATE TABLE IF NOT EXISTS public.project_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL CHECK (length(trim(full_name)) >= 2),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT,
  company_name TEXT,
  website_url TEXT,
  service_interest TEXT NOT NULL DEFAULT 'custom_ai_agent' CHECK (
    service_interest IN (
      'custom_ai_agent',
      'web_development',
      'ecommerce_solution',
      'ai_automation',
      'custom_digital_solution',
      'other'
    )
  ),
  business_industry TEXT,
  project_budget TEXT,
  project_timeline TEXT,
  message TEXT NOT NULL CHECK (length(trim(message)) >= 5),
  source_page TEXT NOT NULL DEFAULT 'contact',
  status TEXT NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'closed', 'archived')
  ),
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PROJECTS TABLE (Public Portfolio)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_development' CHECK (
    status IN ('in_development', 'coming_soon', 'live', 'archived')
  ),
  technologies TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  cover_image_url TEXT,
  project_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon_key TEXT NOT NULL DEFAULT 'Cpu',
  is_available_for_custom_projects BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. AGENT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.agent_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source_page TEXT NOT NULL DEFAULT 'footer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 8. EXTENSION TABLES (Future AI Product Readiness)
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT,
  plan_tier TEXT DEFAULT 'starter',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.business_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.connected_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('shopify', 'woocommerce', 'amazon', 'custom_api', 'meta_ads', 'google_ads')),
  store_identifier TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disconnected', 'error', 'pending')),
  scopes_granted TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL,
  title TEXT NOT NULL,
  action_summary TEXT NOT NULL,
  projected_impact TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'executed')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  trigger_source TEXT NOT NULL,
  execution_status TEXT NOT NULL DEFAULT 'success' CHECK (execution_status IN ('running', 'success', 'failed', 'gated')),
  runtime_duration_ms INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_project_leads_status ON public.project_leads(status);
CREATE INDEX IF NOT EXISTS idx_project_leads_created_at ON public.project_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_leads_email ON public.project_leads(email);
CREATE INDEX IF NOT EXISTS idx_project_leads_service ON public.project_leads(service_interest);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured) WHERE featured = TRUE;

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(is_published, sort_order);

CREATE INDEX IF NOT EXISTS idx_agent_categories_slug ON public.agent_categories(slug);
CREATE INDEX IF NOT EXISTS idx_agent_categories_published ON public.agent_categories(is_published, sort_order);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);

-- 10. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin_or_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can read own profile or admins can read all" ON public.profiles;
CREATE POLICY "Users can read own profile or admins can read all"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
CREATE POLICY "Admins can update profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin_or_staff());

-- Project Leads Policies
DROP POLICY IF EXISTS "Public can insert project leads" ON public.project_leads;
CREATE POLICY "Public can insert project leads"
  ON public.project_leads FOR INSERT
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins/Staff can read project leads" ON public.project_leads;
CREATE POLICY "Admins/Staff can read project leads"
  ON public.project_leads FOR SELECT
  USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins/Staff can update project leads" ON public.project_leads;
CREATE POLICY "Admins/Staff can update project leads"
  ON public.project_leads FOR UPDATE
  USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins can delete project leads" ON public.project_leads;
CREATE POLICY "Admins can delete project leads"
  ON public.project_leads FOR DELETE
  USING (public.is_admin_or_staff());

-- Public Read / Admin Write for Content Tables
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (is_published = TRUE OR public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins/Staff can manage projects" ON public.projects;
CREATE POLICY "Admins/Staff can manage projects"
  ON public.projects FOR ALL
  USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services"
  ON public.services FOR SELECT
  USING (is_published = TRUE OR public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins/Staff can manage services" ON public.services;
CREATE POLICY "Admins/Staff can manage services"
  ON public.services FOR ALL
  USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Public can view published agent categories" ON public.agent_categories;
CREATE POLICY "Public can view published agent categories"
  ON public.agent_categories FOR SELECT
  USING (is_published = TRUE OR public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins/Staff can manage agent categories" ON public.agent_categories;
CREATE POLICY "Admins/Staff can manage agent categories"
  ON public.agent_categories FOR ALL
  USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Public can insert newsletter subscriber" ON public.newsletter_subscribers;
CREATE POLICY "Public can insert newsletter subscriber"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins/Staff can view newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admins/Staff can view newsletter subscribers"
  ON public.newsletter_subscribers FOR SELECT
  USING (public.is_admin_or_staff());

-- 11. INITIAL SEED DATA
INSERT INTO public.projects (
  slug, name, short_description, full_description, category, status, technologies, featured, sort_order, is_published
) VALUES (
  'ecommerce-growth-ai',
  'E-Commerce Growth AI',
  'An intelligent ecommerce growth system designed to help businesses research markets, discover products, optimize SEO and listings, plan marketing, analyze advertising and identify growth opportunities.',
  'E-Commerce Growth AI is our flagship multi-agent commerce intelligence system currently in development. It unifies 9 specialized reasoning agents — from market whitespace discovery and supplier unit cost analysis to SEO listing optimization, ad creative direction, and autonomous conversion telemetry — backed by strict human approval controls.',
  'AI Agent / Ecommerce',
  'in_development',
  ARRAY['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Multi-Agent Graph', 'Vector Search'],
  TRUE,
  1,
  TRUE
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services (
  slug, title, short_description, full_description, icon_key, is_available_for_custom_projects, sort_order, is_published
) VALUES
('custom-ai-agents', 'Custom AI Agents', 'Intelligent, domain-tailored AI agents engineered to automate complex workflows and accelerate operations.', 'We build proprietary, single-purpose and multi-agent AI systems designed around your proprietary business workflows, customer interactions, and data infrastructure.', 'Bot', TRUE, 1, TRUE),
('web-development', 'Web Development', 'Professional, responsive, and high-performance websites, customer portals, and web applications.', 'From modern brand storefronts and SaaS platforms to dynamic customer dashboards and high-converting landing pages — engineered with clean code and sub-second performance.', 'Layout', TRUE, 2, TRUE),
('ecommerce-solutions', 'Ecommerce Solutions', 'AI-powered ecommerce systems, product research, SEO, marketing, analytics, and growth solutions.', 'End-to-end commerce engineering spanning storefront optimization, automated listing enhancements, margin whitespace discovery, and conversion rate optimization.', 'ShoppingBag', TRUE, 3, TRUE),
('ai-business-automation', 'AI Business Automation', 'Custom AI-powered workflows, data pipelines, and autonomous business orchestration.', 'Eliminate manual operational drag with intelligent document processing, multi-channel lead routing, automated data reconciliation, and proactive decision triggers.', 'Zap', TRUE, 4, TRUE),
('custom-digital-solutions', 'Custom Digital Solutions', 'Business-specific software, internal tools, analytics dashboards, and multi-system integrations.', 'Tailored digital systems, API middleware, reporting control centers, and secure backends built specifically for your team’s operational requirements.', 'Layers', TRUE, 5, TRUE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.agent_categories (
  slug, name, description, sort_order, is_published
) VALUES
('ecommerce', 'Ecommerce', 'Specialized commerce agents for catalog analysis, SEO recovery, whitespace discovery, and ad optimization.', 1, TRUE),
('restaurants-cafes', 'Restaurants & Cafes', 'Operational agents for menu demand forecasting, reservation routing, review intelligence, and supply inventory.', 2, TRUE),
('real-estate', 'Real Estate', 'Property matching agents, automated listing copy generation, buyer qualification, and market pricing telemetry.', 3, TRUE),
('marketing', 'Marketing', 'Campaign planning agents, multi-channel copy generation, viral ad hooks, and retention loop automation.', 4, TRUE),
('sales', 'Sales', 'Inbound lead qualification, CRM enrichment, automated proposal drafting, and meeting follow-up summaries.', 5, TRUE),
('customer-support', 'Customer Support', '24/7 resolution agents with brand-voice alignment, knowledge-base retrieval, and seamless human escalation.', 6, TRUE),
('operations', 'Operations', 'Workflow coordination agents, automated reconciliation, vendor compliance checks, and team alerts.', 7, TRUE),
('custom-business-agents', 'Custom Business Agents', 'Bespoke agent architecture designed from the ground up for proprietary industry workflows and private databases.', 8, TRUE)
ON CONFLICT (slug) DO NOTHING;
