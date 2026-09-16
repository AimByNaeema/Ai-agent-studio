// Google Identity Services wrapper for the admin login gate. Replaces
// Firebase Auth's signInWithPopup(auth, googleProvider) — same "Sign in
// with Google" experience for the admin, but using Google's own Identity
// Services SDK directly (a separate, free Google product from Firebase
// Auth) instead of going through Firebase.

let scriptPromise: Promise<void> | null = null;

function loadGisScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (document.getElementById('google-identity-services')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-identity-services';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Could not load Google Sign-In. Please check your connection.'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

interface GoogleCredentialResponse {
  credential?: string;
}

/**
 * Opens Google's account chooser and resolves with the ID token credential
 * once the visitor picks an account. That credential is a JWT the backend
 * verifies in POST /api/auth/google (see server/lib/googleAuth.js) — it is
 * never trusted client-side. Rejects if the client ID is missing, the
 * script fails to load, or the prompt is dismissed/blocked without a
 * selection.
 */
export function signInWithGoogle(): Promise<string> {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    return Promise.reject(new Error('Google Sign-In is not configured yet. (Missing VITE_GOOGLE_CLIENT_ID.)'));
  }

  return loadGisScript().then(
    () =>
      new Promise<string>((resolve, reject) => {
        const google = (window as any).google;
        if (!google?.accounts?.id) {
          reject(new Error('Google Sign-In failed to initialize. Please try again.'));
          return;
        }

        let settled = false;

        google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: GoogleCredentialResponse) => {
            settled = true;
            if (response?.credential) {
              resolve(response.credential);
            } else {
              reject(new Error('Google sign-in was cancelled.'));
            }
          },
        });

        google.accounts.id.prompt((notification: any) => {
          const dismissed =
            notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.();
          if (dismissed && !settled) {
            reject(new Error('Google sign-in was cancelled or blocked by the browser. Please try again.'));
          }
        });
      })
  );
}
