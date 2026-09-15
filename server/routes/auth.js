import { Router } from 'express';
import { pool } from '../db.js';
import { verifyGoogleIdToken } from '../lib/googleAuth.js';
import { signSessionToken, verifySessionToken } from '../lib/jwt.js';

const router = Router();

// POST /api/auth/google — exchanges a Google ID token (from Google Identity
// Services on the frontend's login page) for a session JWT, IF the signed-in
// email is in the admins table. This replaces Firebase Auth's role: Google
// still does the actual sign-in UX, this server just verifies the token and
// checks the same admin allowlist api/_lib/verifyAdminAuth.js used to check.
router.post('/google', async (req, res) => {
  const { credential } = req.body || {};
  if (!credential || typeof credential !== 'string') {
    return res.status(400).json({ error: 'A Google credential is required.' });
  }

  let payload;
  try {
    payload = await verifyGoogleIdToken(credential);
  } catch (err) {
    console.warn('[auth] Google token verification failed:', err && err.message ? err.message : err);
    return res.status(401).json({ error: 'Could not verify your Google sign-in. Please try again.' });
  }

  const email = payload && payload.email;
  if (!email || payload.email_verified === false) {
    return res.status(401).json({ error: 'Could not verify your Google sign-in. Please try again.' });
  }

  try {
    const result = await pool.query('SELECT email FROM admins WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return res.status(403).json({ error: 'This account is not authorized for admin access.' });
    }
  } catch (err) {
    console.error('[auth] admin lookup error:', err);
    return res.status(500).json({ error: 'Could not verify your admin session. Please try again.' });
  }

  const token = signSessionToken(email);
  return res.status(200).json({
    token,
    email,
    name: payload.name || null,
    picture: payload.picture || null,
  });
});

// GET /api/auth/me — lets the frontend confirm a stored session token is
// still valid on page load (mirrors Firebase's onAuthStateChanged check).
router.get('/me', async (req, res) => {
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not signed in.' });
  }
  try {
    const payload = verifySessionToken(authHeader.slice('Bearer '.length).trim());
    return res.status(200).json({ email: payload.email });
  } catch {
    return res.status(401).json({ error: 'Session expired.' });
  }
});

export default router;
