// Vercel Serverless Function: /api/agent/setup-admin
//
// ONE-TIME bootstrap: creates the site's single real Firebase Auth admin
// account. This exists because this Firebase project's Google Cloud IAM
// ownership is held by a Google-managed service account (it is an "AI
// Studio" managed project), so the site owner cannot use the Firebase
// Console's Authentication > Add user screen directly. This endpoint uses
// only the project's public Web API key (the same key already shipped to
// every visitor's browser in the compiled frontend) via Firebase Auth's
// public REST signUp method - it needs no service-account key and no
// elevated Google Cloud permission.
//
// Security:
// - Requires a server-only secret (ADMIN_SETUP_SECRET, set once in Vercel
//   Environment Variables by the site owner - never written in source code)
//   to be sent and match exactly, or the request is rejected outright.
// - Only allows creating an account for one of the two admin emails already
//   trusted by firestore.rules' isAdmin() - no arbitrary signup.
// - Naturally self-disables after first use: once that Firebase Auth user
//   exists, Firebase itself rejects a second signUp for the same email
//   (EMAIL_EXISTS), so this endpoint cannot be used to create a second or
//   rogue admin account later, even if someone finds the URL.
// - The password is sent once, over HTTPS, straight through to Firebase's
//   own signUp endpoint. This function never stores it, logs it, or writes
//   it anywhere - Firebase stores only a salted hash on its side, exactly
//   as it does for every normal sign-up on any Firebase project.

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const firebaseConfig = JSON.parse(
  readFileSync(join(__dirname, '../../firebase-applet-config.json'), 'utf-8')
);

const ADMIN_EMAILS = ['aimbynaeema@gmail.com', 'aiagentstudioo@gmail.com'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, setupSecret } = req.body || {};

  const expectedSecret = process.env.ADMIN_SETUP_SECRET;
  if (!expectedSecret) {
    return res.status(503).json({
      error: 'Admin setup is not enabled yet. Set ADMIN_SETUP_SECRET in Vercel Environment Variables first.',
    });
  }
  if (!setupSecret || setupSecret !== expectedSecret) {
    return res.status(401).json({ error: 'Incorrect setup code.' });
  }

  if (!email || !ADMIN_EMAILS.includes(email)) {
    return res.status(400).json({
      error: `Email must be one of the site's configured admin addresses: ${ADMIN_EMAILS.join(', ')}`,
    });
  }
  if (!password || String(password).length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  }

  try {
    const signUpRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: false }),
      }
    );
    const data = await signUpRes.json();

    if (!signUpRes.ok) {
      const code = data?.error?.message || '';
      if (code === 'EMAIL_EXISTS') {
        return res.status(409).json({
          error: 'An admin account already exists for this email. Setup is already complete - just sign in normally.',
        });
      }
      console.error('Admin setup signUp error:', data);
      return res.status(502).json({ error: 'Could not create the admin account. Please try again.' });
    }

    return res.status(200).json({
      created: true,
      email,
      message: 'Admin account created. You can now sign in with this email and password.',
    });
  } catch (err) {
    console.error('setup-admin handler error:', err);
    return res.status(500).json({ error: 'Something went wrong creating the admin account.' });
  }
}
