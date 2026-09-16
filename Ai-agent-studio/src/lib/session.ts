// Admin session store — replaces Firebase Auth's role of "who is the
// currently signed-in admin, and what do I send as proof on each request."
//
// After a successful Google Sign-In (see src/pages/AdminPage.tsx), the
// backend returns a session JWT (POST /api/auth/google). That token is kept
// here, persisted to localStorage so the admin stays signed in across page
// reloads/browser restarts — the same behavior Firebase Auth's default
// persistence gave before. It is sent as `authorization: Bearer <token>` on
// every admin-only request (see src/lib/api.ts's adminFetch).

const STORAGE_KEY = 'aiagentstudio_admin_session';

export interface AdminSession {
  token: string;
  email: string;
  name?: string | null;
  picture?: string | null;
}

type Listener = (session: AdminSession | null) => void;
const listeners = new Set<Listener>();

function readStoredSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.token === 'string' && typeof parsed.email === 'string') {
      return parsed as AdminSession;
    }
    return null;
  } catch {
    return null;
  }
}

let currentSession: AdminSession | null = readStoredSession();

export function getSession(): AdminSession | null {
  return currentSession;
}

export function getSessionToken(): string | null {
  return currentSession?.token || null;
}

export function setSession(session: AdminSession | null): void {
  currentSession = session;
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors (e.g. private browsing quota) — the in-memory
    // session still works for the rest of this page load.
  }
  listeners.forEach((listener) => listener(currentSession));
}

/**
 * Subscribe to session changes (sign-in, sign-out, forced logout on a 401).
 * Returns an unsubscribe function — mirrors Firebase's onAuthStateChanged
 * shape closely enough that AdminPage.tsx's useEffect needs minimal changes.
 */
export function onSessionChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
