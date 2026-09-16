import { Router } from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();
const STATUSES = ['in_development', 'coming_soon', 'live', 'available_for_custom_projects', 'concept', 'archived'];

function newId(prefix) {
  return `${prefix}-${crypto.randomUUID().replace(/-/g, '')}`;
}

// GET /api/projects — public, published only. Mirrors fetchPublishedProjects().
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE is_published = true ORDER BY sort_order ASC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[projects] list error:', err);
    return res.status(500).json({ error: 'Could not load projects.' });
  }
});

// GET /api/projects/admin — admin, all projects. Mirrors fetchAdminProjects().
router.get('/admin', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY sort_order ASC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[projects] admin list error:', err);
    return res.status(500).json({ error: 'Could not load projects.' });
  }
});

// PUT /api/projects/admin/:id — admin, upsert. Mirrors saveProject(). Pass
// ":id" as "new" to create a fresh record with a generated id.
router.put('/admin/:id', requireAdmin, async (req, res) => {
  const id = req.params.id === 'new' ? newId('proj') : req.params.id;
  const b = req.body || {};
  if (!b.slug || !b.name || !b.short_description || !b.full_description || !b.category) {
    return res.status(400).json({ error: 'slug, name, short_description, full_description, and category are required.' });
  }
  if (!STATUSES.includes(b.status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO projects (id, slug, name, short_description, full_description, category, status,
        technologies, featured, cover_image_url, project_url, sort_order, is_published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug, name = EXCLUDED.name, short_description = EXCLUDED.short_description,
        full_description = EXCLUDED.full_description, category = EXCLUDED.category, status = EXCLUDED.status,
        technologies = EXCLUDED.technologies, featured = EXCLUDED.featured, cover_image_url = EXCLUDED.cover_image_url,
        project_url = EXCLUDED.project_url, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published,
        updated_at = now()
       RETURNING *`,
      [id, b.slug, b.name, b.short_description, b.full_description, b.category, b.status,
       Array.isArray(b.technologies) ? b.technologies : [], Boolean(b.featured), b.cover_image_url || null,
       b.project_url || null, Number.isFinite(b.sort_order) ? b.sort_order : 0, b.is_published !== false]
    );
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[projects] save error:', err);
    return res.status(500).json({ error: 'Could not save project.' });
  }
});

export default router;
