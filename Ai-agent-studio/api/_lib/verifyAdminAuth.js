// Shared helper for admin-protected serverless functions.
//
// Verifies the Firebase ID token the signed-in admin's browser sends, and
// confirms the signed-in account is one of the two emails firestore.rules'
// isAdmin() already trusts. Uses Firebase Auth's public REST "lookup"
// method with the project's public Web API key (the same key already
// shipped to every visitor's browser in the compiled frontend) - this needs
// no service-account key and no elevated Google Cloud IAM permission, which
// matters because this project's Console ownership is held by a
// Google-managed "AI Studio" service account rather than a real person.
//
// Usage in a handler:
//   const authResult = await verifyAdminAuth(req);
//   if (!authResult.ok) {
//     return res.status(authResult.status).json({ error: authResult.error });
//   }

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const firebaseConfig = JSON.parse(
  readFileSync(join(__dirname, '../../firebase-applet-config.json'), 'utf-8')
);

const ADMIN_EMAILS = ['aimbynaeema@gmail.com', 'aiagentstudioo@gmail.com'];

export async function verifyAdminAuth(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) {
    return { ok: false, status: 401, error: 'Not signed in. Please log in as an admin first.' };
  }
  const idToken = authHeader.slice('Bearer '.length).trim();
  if (!idToken) {
    return { ok: false, status: 401, error: 'Not signed in. Please log in as an admin first.' };
  }

  try {
    const lookupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ idToken }),
      }
    );
    if (!lookupRes.ok) {
      return { ok: false, status: 401, error: 'Your session has expired. Please log in again.' };
    }
    const data = await lookupRes.json();
    const user = data?.users?.[0];
    const email = user?.email;

    if (!email || !ADMIN_EMAILS.includes(email)) {
      return { ok: false, status: 403, error: 'This account is not authorized for admin access.' };
    }
    if (user.disabled) {
      return { ok: false, status: 403, error: 'This admin account has been disabled.' };
    }
    return { ok: true, email };
  } catch (err) {
    console.error('verifyAdminAuth error:', err);
    return { ok: false, status: 500, error: 'Could not verify your admin session. Please try again.' };
  }
}
