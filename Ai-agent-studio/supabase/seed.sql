-- ============================================================================
-- AI AGENT STUDIO — Database Initial Seed Data
-- File: supabase/seed.sql
-- Description: Seeds the initial real project, services, and agent categories.
-- ============================================================================

-- 1. SEED PROJECTS (Real current project only)
INSERT INTO public.projects (
  slug,
  name,
  short_description,
  full_description,
  category,
  status,
  technologies,
  featured,
  sort_order,
  is_published
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
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  technologies = EXCLUDED.technologies,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

-- 2. SEED SERVICES (Core business capabilities)
INSERT INTO public.services (
  slug,
  title,
  short_description,
  full_description,
  icon_key,
  is_available_for_custom_projects,
  sort_order,
  is_published
) VALUES
(
  'custom-ai-agents',
  'Custom AI Agents',
  'Intelligent, domain-tailored AI agents engineered to automate complex workflows and accelerate operations.',
  'We build proprietary, single-purpose and multi-agent AI systems designed around your proprietary business workflows, customer interactions, and data infrastructure. Available for custom client projects.',
  'Bot',
  TRUE,
  1,
  TRUE
),
(
  'web-development',
  'Web Development',
  'Professional, responsive, and high-performance websites, customer portals, and web applications.',
  'From modern brand storefronts and SaaS platforms to dynamic customer dashboards and high-converting landing pages — engineered with clean code, sub-second performance, and responsive mobile precision.',
  'Layout',
  TRUE,
  2,
  TRUE
),
(
  'ecommerce-solutions',
  'Ecommerce Solutions',
  'AI-powered ecommerce systems, product research, SEO, marketing, analytics, and growth solutions.',
  'End-to-end commerce engineering spanning storefront optimization, automated listing enhancements, margin whitespace discovery, ad creative playbooks, and conversion rate optimization.',
  'ShoppingBag',
  TRUE,
  3,
  TRUE
),
(
  'ai-business-automation',
  'AI Business Automation',
  'Custom AI-powered workflows, data pipelines, and autonomous business orchestration.',
  'Eliminate manual operational drag with intelligent document processing, multi-channel lead routing, automated data reconciliation, and proactive decision triggers.',
  'Zap',
  TRUE,
  4,
  TRUE
),
(
  'custom-digital-solutions',
  'Custom Digital Solutions',
  'Business-specific software, internal tools, analytics dashboards, and multi-system integrations.',
  'Tailored digital systems, API middleware, reporting control centers, and secure backends built specifically for your team’s operational requirements.',
  'Layers',
  TRUE,
  5,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  icon_key = EXCLUDED.icon_key,
  is_available_for_custom_projects = EXCLUDED.is_available_for_custom_projects,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

-- 3. SEED AGENT CATEGORIES (Industry Verticals)
INSERT INTO public.agent_categories (
  slug,
  name,
  description,
  sort_order,
  is_published
) VALUES
(
  'ecommerce',
  'Ecommerce',
  'Specialized commerce agents for catalog analysis, SEO recovery, whitespace discovery, and ad optimization.',
  1,
  TRUE
),
(
  'restaurants-cafes',
  'Restaurants & Cafes',
  'Operational agents for menu demand forecasting, reservation routing, review intelligence, and supply inventory.',
  2,
  TRUE
),
(
  'real-estate',
  'Real Estate',
  'Property matching agents, automated listing copy generation, buyer qualification, and market pricing telemetry.',
  3,
  TRUE
),
(
  'marketing',
  'Marketing',
  'Campaign planning agents, multi-channel copy generation, viral ad hooks, and retention loop automation.',
  4,
  TRUE
),
(
  'sales',
  'Sales',
  'Inbound lead qualification, CRM enrichment, automated proposal drafting, and meeting follow-up summaries.',
  5,
  TRUE
),
(
  'customer-support',
  'Customer Support',
  '24/7 resolution agents with brand-voice alignment, knowledge-base retrieval, and seamless human escalation.',
  6,
  TRUE
),
(
  'operations',
  'Operations',
  'Workflow coordination agents, automated reconciliation, vendor compliance checks, and team alerts.',
  7,
  TRUE
),
(
  'custom-business-agents',
  'Custom Business Agents',
  'Bespoke agent architecture designed from the ground up for proprietary industry workflows and private databases.',
  8,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;
