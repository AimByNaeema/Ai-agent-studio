import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.warn('[db] DATABASE_URL is not set. Database queries will fail until it is configured.');
}

const useSsl = process.env.PGSSL === 'true' || process.env.PGSSL === '1';

export const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
  max: Number(process.env.PG_POOL_MAX) || 10,
});

pool.on('error', (err) => {
  console.error('[db] Unexpected idle client error:', err);
});
