/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Base URL of the Express + PostgreSQL backend (server/), e.g. https://your-app.up.railway.app. Empty = same-origin. */
  readonly VITE_API_BASE_URL?: string;
  /** Google OAuth Client ID used by Google Identity Services for the admin login gate (src/lib/googleAuth.ts). */
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
