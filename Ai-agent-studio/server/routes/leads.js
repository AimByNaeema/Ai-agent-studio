import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { publicWriteLimiter } from '../middleware/rateLimit.js';
import { sanitizeText, isValidEmail } from '../lib/sanitize.js';

const router = Router();

const SERVICE_INTERESTS = [
  'custom_ai_agent', 'web_development', 'ecommerce_solution',
  'ai_automation', 'custom_digital_solution', 'other',
];
const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'proposal_sent', 'closed', 'archived'];

// POST /api/leads — public. Mirrors submitProjectLead() in the old
// src/lib/firebase.ts (same validation, same defaults).
router.post('/', publicWriteLimiter, async (req, res) => {
  const body = req.body || {};
  const full_name = sanitizeText(body.full_name);
  const email = body.email ? String(body.email).trim() : '';
  const message = sanitizeText(body.message);
  const service_interest = SERVICE_INTERESTS.includes(body.service_interest)
    ? body.service_interest
    : 'custom_ai_agent';

  if (!full_name || full_name.length < 2 || full_name.length > 150) {
    return res.status(400).json({ success: false, error: 'Please provide your full name (at least 2 characters).' });
  }
  if (!isValidEmail(email) || email.length < 5 || email.length > 150) {
    return res.status(400).json({ success: false, error: 'Please provide a valid business email address.' });
  }
  if (!message || message.length < 5 || message.length > 5000) {
    return res.status(400).json({ success: false, error: 'Please describe your project requirements in at least 5 characters.' });
  }

  const phone = body.phone ? sanitizeText(body.phone) : null;
  const company_name = body.company_name ? sanitizeText(body.company_name) : null;
  const website_url = body.website_url ? sanitizeText(body.website_url) : null;
  const business_industry = body.business_industry ? sanitizeText(body.business_industry) : null;
  const project_budget = body.project_budget ? sanitizeText(body.project_budget) : null;
  const project_timeline = body.project_timeline ? sanitizeText(body.project_timeline) : null;
  const source_page = body.source_page ? sanitizeText(body.source_page) : 'contact';

  try {
    const result = await pool.query(
      `INSERT INTO project_leads
        (full_name, email, phone, company_name, website_url, service_interest,
         business_industry, project_budget, project_timeline, message, source_page)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [full_name, email, phone, company_name, website_url, service_interest,
       business_industry, project_budget, project_timeline, message, source_page]
    );
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[leads] create error:', err);
    return res.status(500).json({ success: false, error: 'Could not save your submission. Please try again.' });
  }
});

// GET /api/leads — admin only. Mirrors fetchAdminLeads().
router.get('/', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM project_leads ORDER BY created_at DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[leads] list error:', err);
    return res.status(500).json({ error: 'Could not load leads.' });
  }
});

// PATCH /api/leads/:id/status — admin only. Mirrors updateLeadStatus().
router.patch('/:id/status', requireAdmin, async (req, res) => {
  const { status } = req.body || {};
  if (!LEAD_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }
  try {
    const result = await pool.query(
      `UPDATE project_leads SET status = $1, updated_at = now() WHERE id = $2 RETURNING *`,
      [status, req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Lead not found.' });
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[leads] update status error:', err);
    return res.status(500).json({ error: 'Could not update lead status.' });
  }
});

// PATCH /api/leads/:id/notes — admin only. Mirrors updateLeadInternalNotes().
router.patch('/:id/notes', requireAdmin, async (req, res) => {
  const notes = typeof req.body?.internal_notes === 'string' ? sanitizeText(req.body.internal_notes) : '';
  try {
    const result = await pool.query(
      `UPDATE project_leads SET internal_notes = $1, updated_at = now() WHERE id = $2 RETURNING *`,
      [notes, req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Lead not found.' });
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[leads] update notes error:', err);
    return res.status(500).json({ error: 'Could not update notes.' });
  }
});

// DELETE /api/leads/:id — admin only. Mirrors deleteLead().
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM project_leads WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Lead not found.' });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[leads] delete error:', err);
    return res.status(500).json({ error: 'Could not delete lead.' });
  }
});

export default router;
