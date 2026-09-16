// Minimal static file server for the built frontend (dist/), used to host
// the website on Railway alongside the backend service instead of Vercel.
// Serves the Vite build output and falls back to index.html for any
// unmatched route so client-side routing (react-router-dom) keeps working
// on a hard refresh/direct link — the same behavior vercel.json's rewrite
// rule gave on Vercel.
//
// For the FIRST request to a given route, this also serves a pre-rendered
// HTML snapshot (see scripts/prerender.mjs) when one exists in
// prerendered/<route>/index.html, instead of the empty SPA shell. That
// snapshot contains the real, already-rendered page content, so search
// engine crawlers and link-preview bots (which mostly don't execute
// JavaScript) see actual text instead of a blank <div id="root">. Real
// visitors are unaffected — the same JS bundle loads right after and takes
// over exactly as before.

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');
const prerenderedDir = join(__dirname, 'prerendered');

const app = express();

app.use(express.static(distDir, { index: false }));

app.get('*', (req, res) => {
  // Strip query string / trailing slash for the lookup, but keep root "/" as-is.
  const routePath = req.path === '/' ? '' : req.path.replace(/\/+$/, '');
  const snapshotPath = join(prerenderedDir, routePath, 'index.html');

  if (existsSync(snapshotPath)) {
    return res.sendFile(snapshotPath);
  }

  res.sendFile(join(distDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[frontend] AI Agent Studio website listening on port ${PORT}`);
});
