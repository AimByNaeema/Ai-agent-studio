// Applies server/db/schema.sql to whatever DATABASE_URL points at. Safe to
// run on every deploy: every statement in schema.sql is idempotent
// (CREATE TABLE IF NOT EXISTS, CREATE INDEX IF NOT EXISTS, ON CONFLICT DO
// NOTHING), so re-running it against an already-migrated database is a
// no-op. Intended to run as the Railway service's pre-deploy command so the
// schema is always in sync before the new code starts serving traffic.

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('[migrate] DATABASE_URL is not set — cannot apply schema.');
    process.exit(1);
  }

  const useSsl = process.env.PGSSL === 'true' || process.env.PGSSL === '1';
  const pool = new Pool({ connectionString, ssl: useSsl ? { rejectUnauthorized: false } : false });

  const sql = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');

  try {
    console.log('[migrate] Applying server/db/schema.sql...');
    await pool.query(sql);
    console.log('[migrate] Schema applied successfully.');

    // Seed an initial admin password from a Railway variable (never
    // committed to Git) — only fills in rows that don't have one yet, so
    // this never overwrites a password an admin has since changed.
    const seedHash = process.env.ADMIN_SEED_PASSWORD_HASH;
    if (seedHash) {
      const result = await pool.query(
        `UPDATE admins SET password_hash = $1 WHERE password_hash IS NULL RETURNING email`,
        [seedHash]
      );
      if (result.rowCount > 0) {
        console.log(`[migrate] Seeded initial password for ${result.rowCount} admin account(s).`);
      }
    }
  } catch (err) {
    console.error('[migrate] Failed to apply schema:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
