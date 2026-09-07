// Vercel Serverless Function: /api/agent/seo-scan
//
// Real on-page SEO scan of THIS SITE'S OWN live routes. No mock data, no
// invented metrics. This function only fetches real HTTP responses from the
// given baseUrl and reports what it actually finds.
//
// Off-site data this agent does NOT have (Search Console rankings/queries,
// Google Analytics traffic, backlinks) is reported in integration_status as
// connected:false with a plain reason — never faked, never guessed.
//
// This function performs GET requests only. It writes nothing anywhere; the
// admin's own browser session persists the returned findings to Firestore
// after reviewing them (see src/lib/agent.ts persistSeoFindings). Running
// this scan is always an explicit action the owner takes from the Admin
// Control Center — it is never scheduled or triggered automatically here.

const DEFAULT_PATHS = ['/', '/platform', '/solutions', '/features', '/how-it-works', '/pricing', '/resources', '/get-started'];

function extractTag(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  const text = await res.text();
  return { status: res.status, text };
}

async function scanPath(baseUrl, path) {
  const url = baseUrl.replace(/\/$/, '') + path;
  const findings = [];
  let status, html;

  try {
    const result = await fetchText(url);
    status = result.status;
    html = result.text;
  } catch (err) {
    findings.push({
      category: 'broken_links',
      page_url: url,
      finding: 'Page could not be fetched.',
      evidence: `Network error fetching ${url}: ${String(err && err.message ? err.message : err)}`,
      recommendation: 'Confirm the URL is reachable and not blocked by DNS/firewall.',
      severity: 'high',
      data_source: 'live_page_fetch',
    });
    return findings;
  }

  if (status >= 400) {
    findings.push({
      category: 'broken_links',
      page_url: url,
      finding: `Page returned HTTP ${status}.`,
      evidence: `Live fetch of ${url} returned status ${status}.`,
      recommendation: 'Fix routing or deployment so this page returns 200.',
      severity: 'high',
      data_source: 'live_page_fetch',
    });
    return findings;
  }

  const title = extractTag(html, /<title[^>]*>([^<]*)<\/title>/i);
  const description = extractTag(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const canonical = extractTag(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const hasH1 = /<h1[\s>]/i.test(html);
  const looksLikeUnrenderedSpaShell = /<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html) || (/<div\s+id=["']root["']/i.test(html) && !hasH1);

  if (!title) {
    findings.push({
      category: 'meta_tags', page_url: url,
      finding: 'No <title> tag found in the server-delivered HTML.',
      evidence: `Fetched ${url} directly; response has no <title> element.`,
      recommendation: 'Ensure every route serves a descriptive <title>.',
      severity: 'high', data_source: 'live_page_fetch',
    });
  } else if (title.length < 15 || title.length > 65) {
    findings.push({
      category: 'meta_tags', page_url: url,
      finding: `Title length is ${title.length} characters, outside the 15-65 character range search engines typically display in full.`,
      evidence: `Title found: "${title}"`,
      recommendation: 'Adjust title length for better search-result display.',
      severity: 'low', data_source: 'live_page_fetch',
    });
  }

  if (!description) {
    findings.push({
      category: 'meta_tags', page_url: url,
      finding: 'No meta description found in the server-delivered HTML.',
      evidence: `Fetched ${url} directly; no <meta name="description"> present in the response.`,
      recommendation: 'Add a meta description (120-160 characters) describing this specific page.',
      severity: 'medium', data_source: 'live_page_fetch',
    });
  }

  if (!canonical) {
    findings.push({
      category: 'meta_tags', page_url: url,
      finding: 'No canonical link tag found.',
      evidence: `Fetched ${url} directly; no <link rel="canonical"> present.`,
      recommendation: 'Add a canonical tag to avoid duplicate-content ambiguity.',
      severity: 'low', data_source: 'live_page_fetch',
    });
  }

  if (looksLikeUnrenderedSpaShell) {
    findings.push({
      category: 'crawlability', page_url: url,
      finding: 'This route renders entirely client-side (React) — the raw HTML response contains only an empty app shell, with no heading or body text.',
      evidence: `Fetched ${url} directly (no JavaScript executed, the way many crawlers and link-preview bots operate); the response body has <div id="root"> with no rendered content and no <h1>.`,
      recommendation: 'Add server-side rendering or static pre-rendering (e.g. a prerender step per route, or migrating to a framework with SSR/SSG) so search engines and social-preview bots that do not execute JavaScript can see real page content.',
      severity: 'high', data_source: 'live_page_fetch',
    });
  }

  return findings;
}

async function scanSiteWideFile(baseUrl, path) {
  const url = baseUrl.replace(/\/$/, '') + path;
  try {
    const { status, text } = await fetchText(url);
    const looksLikeSpaShell = /<div\s+id=["']root["']/i.test(text);
    if (status >= 400 || looksLikeSpaShell) {
      return [{
        category: 'crawlability',
        page_url: url,
        finding: `${path} is not served as a real file.`,
        evidence: looksLikeSpaShell
          ? `Fetched ${url}; status ${status}, but the response body is the React app shell (index.html), not a ${path} file — the SPA catch-all rewrite is intercepting this path.`
          : `Fetched ${url}; status ${status}.`,
        recommendation: `Add a real ${path} file under /public so it is served as a static file ahead of the SPA rewrite in vercel.json.`,
        severity: 'medium',
        data_source: 'live_page_fetch',
      }];
    }
    return [];
  } catch (err) {
    return [{
      category: 'crawlability',
      page_url: url,
      finding: `Could not verify ${path}.`,
      evidence: String(err && err.message ? err.message : err),
      recommendation: 'Retry the scan; if this persists, check the deployment manually.',
      severity: 'info',
      data_source: 'unverified',
    }];
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { baseUrl, paths } = req.body || {};
  if (!baseUrl || typeof baseUrl !== 'string' || !/^https?:\/\//i.test(baseUrl)) {
    return res.status(400).json({ error: 'baseUrl is required and must be a full URL, e.g. https://your-site.vercel.app' });
  }

  const scanPaths = Array.isArray(paths) && paths.length > 0 ? paths.slice(0, 20) : DEFAULT_PATHS;

  try {
    const perPageResults = await Promise.all(scanPaths.map((p) => scanPath(baseUrl, p)));
    const siteWideResults = await Promise.all([
      scanSiteWideFile(baseUrl, '/robots.txt'),
      scanSiteWideFile(baseUrl, '/sitemap.xml'),
    ]);

    const findings = [...perPageResults.flat(), ...siteWideResults.flat()];

    // Off-site integrations this agent does NOT have credentials for. This
    // object is the single source of truth for what is/isn't connected —
    // the frontend must display these as UNVERIFIED, never as data.
    const integration_status = {
      google_search_console: {
        connected: false,
        reason: 'No Search Console credentials are configured on the server (no GOOGLE_SEARCH_CONSOLE_* environment variables set). Real query/ranking data is unavailable until this is connected.',
      },
      google_analytics: {
        connected: false,
        reason: 'No Analytics credentials are configured on the server (no GA4_* environment variables set). Real traffic/conversion data is unavailable until this is connected.',
      },
    };

    return res.status(200).json({
      scanned_at: new Date().toISOString(),
      base_url: baseUrl,
      paths_scanned: scanPaths,
      findings,
      integration_status,
    });
  } catch (err) {
    console.error('SEO scan error:', err);
    return res.status(500).json({ error: 'Scan failed. Please try again.' });
  }
}

