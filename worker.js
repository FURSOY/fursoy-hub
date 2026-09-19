/**
 * FURSOY hub worker.
 *
 * Serves the static brand hub from the repository root and handles two
 * migration concerns before falling through to the assets binding:
 *
 * 1. www canonicalisation: every www.fursoy.com request 301s to the apex,
 *    preserving path and query string.
 * 2. Legacy apex paths: the addresses the Vault site used while it lived on
 *    fursoy.com are 301-redirected to vault.fursoy.com, preserving the query
 *    string. This is a strict allowlist — no wildcard — so future hub paths
 *    can never drift behind a redirect.
 *
 * The apex homepage, robots.txt, sitemap.xml, manifest.webmanifest and hashed
 * build assets are intentionally not redirected: they belong to whichever
 * site the apex serves.
 *
 * Prefer the zone-level Redirect Rules API when the account token has the
 * Single Redirect edit permission; this worker mirrors that matrix so the
 * behaviour stays version-controlled in git either way.
 */

const LEGACY_VAULT_PATHS = new Set([
  "/download",
  "/privacy",
  "/og.png",
  "/app-icon.png",
  "/brand-mark.png",
]);

const APEX_HOST = "fursoy.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    if (host === `www.${APEX_HOST}`) {
      const target = new URL(url.toString());
      target.hostname = APEX_HOST;
      return Response.redirect(target.toString(), 301);
    }

    if (host === APEX_HOST && LEGACY_VAULT_PATHS.has(url.pathname)) {
      const target = new URL(url.toString());
      target.hostname = `vault.${APEX_HOST}`;
      return Response.redirect(target.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
