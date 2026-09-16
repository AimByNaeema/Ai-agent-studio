import rateLimit from 'express-rate-limit';

// General ceiling applied to every /api request.
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

// Tighter limit for public write endpoints that write unauthenticated data
// (contact-form leads, newsletter signups) — the endpoints a bot could
// otherwise hammer to spam the database.
export const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

// Tighter still for the chat widget, since every message costs a paid
// Claude/Gemini API call.
export const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please wait a moment and try again.' },
});

// Strict limit on admin login attempts (email + password) to slow down
// credential-guessing/brute-force attempts against the admin account.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many sign-in attempts. Please wait a few minutes and try again.' },
});
