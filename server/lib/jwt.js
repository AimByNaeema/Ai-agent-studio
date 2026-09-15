import jwt from 'jsonwebtoken';

const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function requireSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set on the server.');
  }
  return secret;
}

// Issued after a successful Google Sign-In + admin allowlist check (see
// routes/auth.js). This JWT plays the exact role the Firebase ID token used
// to play: the frontend sends it as `authorization: Bearer <token>` on every
// admin-only request, and requireAdmin.js verifies it server-side.
export function signSessionToken(email) {
  return jwt.sign({ email }, requireSecret(), { expiresIn: EXPIRES_IN });
}

export function verifySessionToken(token) {
  return jwt.verify(token, requireSecret());
}
