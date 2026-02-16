# External Integrations

**Analysis Date:** 2026-02-16

## APIs & External Services

**Search (bundled via VitePress):**
- Algolia DocSearch - VitePress includes Algolia autocomplete packages as transitive dependencies (`@algolia/autocomplete-core`, etc. in `package-lock.json`), but no Algolia configuration is active in `.vitepress/config.mts`. Search is not currently enabled.

**External Links (content only, no API integration):**
- GitHub (`github.com/miwurster`) - Profile link in `index.md` and `.vitepress/config.mts`
- LinkedIn (`linkedin.com/in/miwurster`) - Profile link in `index.md` and `.vitepress/config.mts`
- Twitter (`twitter.com/miwurster`) - Link in `index.md` (commented out in `.vitepress/config.mts`)

## Data Storage

**Databases:**
- None - This is a purely static site with no database

**File Storage:**
- Local filesystem only - All content is Markdown files committed to the repository

**Caching:**
- Vite dependency pre-bundling cache at `.vitepress/cache/` (local dev only, gitignored)

## Authentication & Identity

**Auth Provider:**
- None - Public static site with no authentication

## Monitoring & Observability

**Error Tracking:**
- None

**Analytics:**
- None detected - No analytics scripts or tracking configured in `.vitepress/config.mts`

**Logs:**
- None - Static site has no server-side logging

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Static site served from GitHub's CDN

**CI Pipeline:**
- GitHub Actions - `.github/workflows/deploy.yaml`
- **Trigger:** Push to `main` branch, or manual `workflow_dispatch`
- **Build job:** Ubuntu latest, Node.js 20, `npm ci` + `npm run docs:build`
- **Deploy job:** Uses `actions/deploy-pages@v4` to publish `.vitepress/dist/`
- **Concurrency:** Single concurrent deployment (`group: pages`, `cancel-in-progress: false`)

**GitHub Actions used:**
- `actions/checkout@v4` - Code checkout with full history (`fetch-depth: 0`)
- `actions/setup-node@v4` - Node.js 20 with npm cache
- `actions/configure-pages@v4` - GitHub Pages configuration
- `actions/upload-pages-artifact@v3` - Upload built site as artifact
- `actions/deploy-pages@v4` - Deploy artifact to GitHub Pages

**Permissions required:**
- `contents: read` - Read repository
- `pages: write` - Deploy to Pages
- `id-token: write` - OIDC token for Pages deployment

## Environment Configuration

**Required env vars:**
- None - No environment variables needed for build or deployment

**Secrets location:**
- No secrets required - GitHub Pages deployment uses built-in `GITHUB_TOKEN`

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## External Content References

**Images loaded at runtime:**
- `https://www.github.com/miwurster.png` - GitHub avatar used in `index.md`
- `https://img.shields.io/badge/LinkedIn-blue?...` - LinkedIn badge in `README.md`

**Academic publication links:**
- Multiple external links to Springer, IEEE, SciTePress, and University of Stuttgart publication servers in `publications.md` (content links only, no API integration)

---

*Integration audit: 2026-02-16*
