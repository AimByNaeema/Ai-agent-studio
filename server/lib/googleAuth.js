import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

// Verifies a Google ID token minted client-side by Google Identity Services
// (the "Sign in with Google" button — a separate, free Google product from
// Firebase Auth). GOOGLE_CLIENT_ID must match the client ID configured on
// the frontend; that's what proves the token was really issued for this app.
export async function verifyGoogleIdToken(idToken) {
  const audience = process.env.GOOGLE_CLIENT_ID;
  if (!audience) {
    throw new Error('GOOGLE_CLIENT_ID is not set on the server.');
  }
  const ticket = await client.verifyIdToken({ idToken, audience });
  return ticket.getPayload();
}
