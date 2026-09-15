// Mirrors sanitizeText() / isValidEmail() from the old src/lib/firebase.ts
// exactly, so validation behavior is unchanged after the migration.

export function sanitizeText(input) {
  if (!input) return '';
  return String(input)
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
}

export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(String(email).trim());
}
