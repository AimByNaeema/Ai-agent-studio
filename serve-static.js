// Minimal static file server for the built frontend (dist/), used to host
// the website on Railway alongside the backend service instead of Vercel.
// Serves the Vite build output and falls back to index.html for any
// unmatched route so client-side routing (react-router-dom) keeps working
// on a hard refresh/direct link — the same behavior vercel.json's rewrite
// rule gave on Vercel.

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');

const app = express();

app.use(express.static(distDir, { index: false }));

app.get('*', (_req, res) => {
  res.sendFile(join(distDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[frontend] AI Agent Studio website listening on port ${PORT}`);
});
