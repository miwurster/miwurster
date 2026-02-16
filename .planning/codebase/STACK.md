# Technology Stack

**Analysis Date:** 2026-02-16

## Languages

**Primary:**
- TypeScript - VitePress config (`.vitepress/config.mts`), theme setup (`.vitepress/theme/index.ts`), Vue component scripts (`.vitepress/components/ResumeItem.vue`, `.vitepress/components/ResumeSection.vue`)
- Markdown - Content pages (`index.md`, `resume.md`, `publications.md`)

**Secondary:**
- CSS - Custom styling (`.vitepress/theme/styles/custom.css`, scoped styles in Vue components)
- HTML - Inline HTML within Markdown content and Vue templates

## Runtime

**Environment:**
- Node.js 20 (CI target per `.github/workflows/deploy.yaml`; local detected as v24.13.0)

**Package Manager:**
- npm 11.6.2 (local)
- Lockfile: `package-lock.json` present (lockfileVersion 3)

## Frameworks

**Core:**
- VitePress `1.6.3` (specified as `^1` in `package.json`) - Static site generator built on Vue 3 and Vite; drives the entire site
- Vue `3.5.13` (transitive dependency via VitePress) - Component framework used for custom components
- Vite `5.4.19` (transitive dependency via VitePress) - Build tooling and dev server

**Testing:**
- None detected - No test framework, no test files

**Build/Dev:**
- VitePress CLI - All build/dev commands use VitePress directly via npm scripts in `package.json`

## Key Dependencies

**Critical:**
- `vitepress` `^1` - The entire site framework; generates static HTML from Markdown + Vue components
- `vitepress-plugin-back-to-top` `^1` (installed: `1.0.1`) - UI plugin providing scroll-to-top button; registered in `.vitepress/theme/index.ts`

**Infrastructure:**
- All dependencies are `devDependencies` only - there are zero production dependencies. This is a static site; the output is plain HTML/CSS/JS.

## npm Scripts

```bash
npm run docs:dev       # Start local dev server with hot reload
npm run docs:build     # Build static site to .vitepress/dist/
npm run docs:preview   # Preview the built site locally
```

Defined in `package.json`.

## Configuration

**VitePress Config:**
- `.vitepress/config.mts` - Site title, description, navigation, social links, footer
- Uses the default VitePress theme extended with custom components and plugin

**Theme Customization:**
- `.vitepress/theme/index.ts` - Extends `DefaultTheme`, registers `ResumeItem` and `ResumeSection` global components, initializes back-to-top plugin
- `.vitepress/theme/styles/custom.css` - Custom `.justified` CSS class for text formatting

**Environment:**
- No `.env` files present
- No environment variables required for build or dev
- No secrets or API keys needed

**Build Output:**
- `.vitepress/dist/` - Generated static site (gitignored)
- `.vitepress/cache/` - Vite dependency cache (gitignored)

## Platform Requirements

**Development:**
- Node.js >= 20
- npm (any recent version)
- No other system dependencies

**Production:**
- Static file hosting only (HTML/CSS/JS)
- Deployed to GitHub Pages via GitHub Actions

---

*Stack analysis: 2026-02-16*
