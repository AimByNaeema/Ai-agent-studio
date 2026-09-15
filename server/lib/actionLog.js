import { pool } from '../db.js';

// Append-only audit trail — every agent run and every human approve/reject
// decision, mirrored from logAgentAction() in the old src/lib/agent.ts.
// Logging must never block the primary action, so failures are swallowed
// exactly as before.
export async function logAgentAction(action, summary, opts = {}) {
  try {
    await pool.query(
      `INSERT INTO agent_action_log (action, actor, target_id, summary, evidence)
       VALUES ($1, $2, $3, $4, $5)`,
      [action, opts.actor || 'owner', opts.target_id || null, summary, opts.evidence || null]
    );
  } catch (err) {
    console.warn('[Agent] Failed to write action log:', err);
  }
}
