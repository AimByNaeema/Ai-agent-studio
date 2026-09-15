import { Router } from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

function newId(prefix) {
  return `${prefix}-${crypto.randomUUID().replace(/-/g, '')}`;
}

// GET /api/agent-categories — public. Mirrors fetchPublishedAgentCategories().
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agent_categories ORDER BY sort_order ASC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[agent-categories] list error:', err);
    return res.status(500).json({ error: 'Could not load agent categories.' });
  }
});

// GET /api/agent-categories/admin — admin. Mirrors fetchAdminCategories().
router.get('/admin', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agent_categories ORDER BY sort_order ASC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[agent-categories] admin list error:', err);
    return res.status(500).json({ error: 'Could not load agent categories.' });
  }
});

// PUT /api/agent-categories/admin/:id — admin, upsert. Pass ":id" as "new"
// to create a fresh record with a generated id.
router.put('/admin/:id', requireAdmin, async (req, res) => {
  const id = req.params.id === 'new' ? newId('cat') : req.params.id;
  const b = req.body || {};
  if (!b.slug || !b.name || !b.description) {
    return res.status(400).json({ error: 'slug, name, and description are required.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO agent_categories (id, slug, name, description, is_published, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug, name = EXCLUDED.name, description = EXCLUDED.description,
        is_published = EXCLUDED.is_published, sort_order = EXCLUDED.sort_order, updated_at = now()
       RETURNING *`,
      [id, b.slug, b.name, b.description, b.is_published !== false, Number.isFinite(b.sort_order) ? b.sort_order : 0]
    );
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[agent-categories] save error:', err);
    return res.status(500).json({ error: 'Could not save agent category.' });
  }
});

export default router;
