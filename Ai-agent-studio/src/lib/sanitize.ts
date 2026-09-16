// Client-side validation/sanitization helpers — mirrors the ones removed
// from src/lib/firebase.ts (which are now duplicated server-side in
// server/lib/sanitize.js as the real enforcement point). Kept here purely
// for the same instant-feedback UX the forms already had.

export function sanitizeText(input: string | undefined | null): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email.trim());
}
