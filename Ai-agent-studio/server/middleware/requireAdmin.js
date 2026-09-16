import { verifySessionToken } from '../lib/jwt.js';
import { pool } from '../db.js';

// Replaces api/_lib/verifyAdminAuth.js. The frontend sends the session JWT
// issued by POST /api/auth/google as a Bearer token — exactly the same
// calling convention it previously used for a Firebase ID token, so
// src/lib/agent.ts's fetch() calls need no shape changes, only a different
// token source.
export async function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not signed in. Please log in as an admin first.' });
  }
  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    return res.status(401).json({ error: 'Not signed in. Please log in as an admin first.' });
  }

  let payload;
  try {
    payload = verifySessionToken(token);
  } catch (err) {
    return res.status(401).json({ error: 'Your session has expired. Please log in again.' });
  }

  const email = payload && payload.email;
  if (!email) {
    return res.status(401).json({ error: 'Your session has expired. Please log in again.' });
  }

  try {
    const result = await pool.query('SELECT email FROM admins WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return res.status(403).json({ error: 'This account is not authorized for admin access.' });
    }
  } catch (err) {
    console.error('requireAdmin error:', err);
    return res.status(500).json({ error: 'Could not verify your admin session. Please try again.' });
  }

  req.adminEmail = email;
  next();
}
