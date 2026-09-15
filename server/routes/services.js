import { Router } from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

function newId(prefix) {
  return `${prefix}-${crypto.randomUUID().replace(/-/g, '')}`;
}

// GET /api/services — public. Mirrors fetchPublishedServices(), which in the
// old code returned the whole collection (used to ground the chat widget
// and lead-draft prompts in the real catalog) — preserved exactly.
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[services] list error:', err);
    return res.status(500).json({ error: 'Could not load services.' });
  }
});

// GET /api/services/admin — admin. Mirrors fetchAdminServices().
router.get('/admin', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[services] admin list error:', err);
    return res.status(500).json({ error: 'Could not load services.' });
  }
});

// PUT /api/services/admin/:id — admin, upsert. Pass ":id" as "new" to create
// a fresh record with a generated id.
router.put('/admin/:id', requireAdmin, async (req, res) => {
  const id = req.params.id === 'new' ? newId('svc') : req.params.id;
  const b = req.body || {};
  if (!b.slug || !b.title || !b.short_description || !b.full_description || !b.icon_key) {
    return res.status(400).json({ error: 'slug, title, short_description, full_description, and icon_key are required.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO services (id, slug, title, short_description, full_description, icon_key,
        key_features, deliverables, is_available_for_custom_projects, sort_order, is_published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug, title = EXCLUDED.title, short_description = EXCLUDED.short_description,
        full_description = EXCLUDED.full_description, icon_key = EXCLUDED.icon_key,
        key_features = EXCLUDED.key_features, deliverables = EXCLUDED.deliverables,
        is_available_for_custom_projects = EXCLUDED.is_available_for_custom_projects,
        sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = now()
       RETURNING *`,
      [id, b.slug, b.title, b.short_description, b.full_description, b.icon_key,
       Array.isArray(b.key_features) ? b.key_features : [], Array.isArray(b.deliverables) ? b.deliverables : [],
       b.is_available_for_custom_projects !== false, Number.isFinite(b.sort_order) ? b.sort_order : 0, b.is_published !== false]
    );
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[services] save error:', err);
    return res.status(500).json({ error: 'Could not save service.' });
  }
});

export default router;
