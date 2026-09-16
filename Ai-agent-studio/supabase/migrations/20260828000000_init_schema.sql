-- ============================================================================
-- AI AGENT STUDIO — Database Schema Migration
-- Migration: 20260828000000_init_schema.sql
-- Description: Production-ready database schema for profiles, project_leads,
--              projects, services, agent_categories, newsletter_subscribers,
--              future AI-agent architecture, triggers, indexes, and Row Level Security (RLS).
-- ============================================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. PROFILES TABLE (Authenticated Administrators & Staff)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. PROJECT LEADS TABLE (Contact & Start Your Project Lead Capture)
-- ============================================================================
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

-- ============================================================================
-- 3. PROJECTS TABLE (Public Portfolio & Case Studies)
-- ============================================================================
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

-- ============================================================================
-- 4. SERVICES TABLE (Services Offered by AI AGENT STUDIO)
-- ============================================================================
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

-- ============================================================================
-- 5. AGENT CATEGORIES TABLE (Industry AI-Agent Verticals)
-- ============================================================================
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

-- ============================================================================
-- 6. NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source_page TEXT NOT NULL DEFAULT 'footer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================================
-- 7. FUTURE ARCHITECTURE: EXTENSION TABLES (Prepared for Product Expansion)
-- ============================================================================

-- Multi-Tenant Businesses
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT,
  plan_tier TEXT DEFAULT 'starter',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Business Team Members
CREATE TABLE IF NOT EXISTS public.business_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Connected Storefront & Platform Integrations
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

-- Human-in-the-Loop Approval Requests
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

-- Agent Autonomous Execution Telemetry
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

-- System Audit Logs
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

-- ============================================================================
-- 8. INDEXES FOR HIGH-PERFORMANCE QUERYING
-- ============================================================================
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

-- ============================================================================
-- 9. AUTOMATIC TIMESTAMP TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_project_leads_updated_at ON public.project_leads;
CREATE TRIGGER set_project_leads_updated_at
  BEFORE UPDATE ON public.project_leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_services_updated_at ON public.services;
CREATE TRIGGER set_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Helper function to check if the current user has admin or staff privileges
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
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id OR public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
CREATE POLICY "Admins can update profiles"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin_or_staff());

-- Project Leads Policies
-- Public / Anon can insert leads via the validated submission form
DROP POLICY IF EXISTS "Public can insert project leads" ON public.project_leads;
CREATE POLICY "Public can insert project leads"
  ON public.project_leads
  FOR INSERT
  WITH CHECK (TRUE);

-- Only authenticated admin/staff can select, update, or delete project leads
DROP POLICY IF EXISTS "Admins/Staff can read project leads" ON public.project_leads;
CREATE POLICY "Admins/Staff can read project leads"
  ON public.project_leads
  FOR SELECT
  USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins/Staff can update project leads" ON public.project_leads;
CREATE POLICY "Admins/Staff can update project leads"
  ON public.project_leads
  FOR UPDATE
  USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins can delete project leads" ON public.project_leads;
CREATE POLICY "Admins can delete project leads"
  ON public.project_leads
  FOR DELETE
  USING (public.is_admin_or_staff());

-- Projects Policies
-- Public can view published projects
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
  ON public.projects
  FOR SELECT
  USING (is_published = TRUE OR public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins/Staff can manage projects" ON public.projects;
CREATE POLICY "Admins/Staff can manage projects"
  ON public.projects
  FOR ALL
  USING (public.is_admin_or_staff());

-- Services Policies
-- Public can view published services
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services"
  ON public.services
  FOR SELECT
  USING (is_published = TRUE OR public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins/Staff can manage services" ON public.services;
CREATE POLICY "Admins/Staff can manage services"
  ON public.services
  FOR ALL
  USING (public.is_admin_or_staff());

-- Agent Categories Policies
-- Public can view published agent categories
DROP POLICY IF EXISTS "Public can view published agent categories" ON public.agent_categories;
CREATE POLICY "Public can view published agent categories"
  ON public.agent_categories
  FOR SELECT
  USING (is_published = TRUE OR public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admins/Staff can manage agent categories" ON public.agent_categories;
CREATE POLICY "Admins/Staff can manage agent categories"
  ON public.agent_categories
  FOR ALL
  USING (public.is_admin_or_staff());

-- Newsletter Subscribers Policies
DROP POLICY IF EXISTS "Public can insert newsletter subscriber" ON public.newsletter_subscribers;
CREATE POLICY "Public can insert newsletter subscriber"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins/Staff can view newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admins/Staff can view newsletter subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  USING (public.is_admin_or_staff());
