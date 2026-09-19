# FURSOY hub (fursoy.com)

The FURSOY brand hub: the central address that lists the products and links to
each product site. Dependency-free static website served by Cloudflare Workers
Assets, following the canonical FURSOY Web Design Standard
(`C:/Projeler/fursoy-vault/website/FURSOY_WEB_GUIDELINES.md`).

## Domain map

| Host | Role |
|---|---|
| `fursoy.com` | this hub |
| `vault.fursoy.com` | FURSOY Vault product site |
| `mail.fursoy.com` | FURSOY Mail product site |
| `portfolyom.fursoy.com` | Portfolyom public/legal site |
| `www.fursoy.com` | 301 to `fursoy.com` |

Legacy Vault paths on the apex (`/download`, `/privacy`, `/og.png`, …) are
redirected to `vault.fursoy.com` by a zone-level redirect rule; this repository
owns only the hub itself.

## Local preview

Serve the repository root with any static file server.

## Cloudflare Workers Builds

- Production branch: `main`
- Worker name: `fursoy-hub`
- Root directory: repository root
- Build command: `exit 0`
- Deploy command: `npx wrangler deploy`

The Worker configuration is stored in `wrangler.jsonc`. No project environment
variables or package installation are required.

The public website contains no analytics, telemetry, form processing or
database bindings.
