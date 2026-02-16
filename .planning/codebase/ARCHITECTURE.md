# Architecture

**Analysis Date:** 2026-02-16

## Pattern Overview

**Overall:** Static site generator (VitePress) with custom Vue components

**Key Characteristics:**
- Content-driven architecture: Markdown files at project root serve as page sources
- VitePress handles all build, routing, and rendering — no custom server or API
- Custom Vue components extend the default VitePress theme for resume-specific layouts
- Inline `<script setup>` blocks in Markdown define page-level data (no external data layer)
- GitHub Actions CI/CD pipeline builds and deploys to GitHub Pages on push to `main`

## Layers

**Content Layer:**
- Purpose: Defines all page content as Markdown files with optional Vue `<script setup>` blocks
- Location: project root (`/`)
- Contains: `index.md` (homepage), `resume.md` (resume page), `publications.md` (publications page)
- Depends on: VitePress Markdown engine, custom Vue components
- Used by: VitePress build pipeline

**Theme Layer:**
- Purpose: Extends VitePress DefaultTheme with custom styling and globally registered Vue components
- Location: `.vitepress/theme/`
- Contains: Theme entry point (`index.ts`), custom CSS (`styles/custom.css`)
- Depends on: `vitepress/theme` (DefaultTheme), `vitepress-plugin-back-to-top`, custom components
- Used by: VitePress at build and dev time

**Component Layer:**
- Purpose: Provides reusable Vue components for structured resume data rendering
- Location: `.vitepress/components/`
- Contains: `ResumeItem.vue` (single resume entry card), `ResumeSection.vue` (list of resume items)
- Depends on: Vue 3 Composition API
- Used by: Content layer (`resume.md`) and theme layer (globally registered)

**Configuration Layer:**
- Purpose: Defines site-level VitePress configuration (title, nav, social links, footer)
- Location: `.vitepress/config.mts`
- Contains: Site metadata, navigation structure, social links, theme config
- Depends on: VitePress `defineConfig` API
- Used by: VitePress build pipeline

**CI/CD Layer:**
- Purpose: Automates build and deployment to GitHub Pages
- Location: `.github/workflows/deploy.yaml`
- Contains: GitHub Actions workflow with build and deploy jobs
- Depends on: Node.js 20, npm, GitHub Pages
- Used by: GitHub Actions (triggered on push to `main` or manual dispatch)

## Data Flow

**Page Rendering (resume.md as example):**

1. `resume.md` defines structured data arrays (`experience`, `education`, `profile`, `skills`) in a `<script setup>` block
2. Markdown body references Vue components: `<ResumeSection :items="experience">`, `<ResumeItem :description="profile"/>`
3. VitePress processes the Markdown, resolving component references via globally registered components in `.vitepress/theme/index.ts`
4. `ResumeSection.vue` iterates over `items` array, rendering each via `ResumeItem.vue`
5. `ResumeItem.vue` renders a card with title, subtitle, date range, location, and HTML description
6. VitePress generates static HTML output to `.vitepress/dist/`

**Build & Deploy:**

1. Push to `main` triggers `.github/workflows/deploy.yaml`
2. GitHub Actions checks out code, installs dependencies (`npm ci`), runs `npm run docs:build`
3. VitePress builds static site to `.vitepress/dist/`, a `.nojekyll` file is added
4. Artifact is uploaded via `actions/upload-pages-artifact`
5. Deploy job deploys artifact to GitHub Pages

**State Management:**
- No runtime state management — all data is defined inline in Markdown `<script setup>` blocks as local constants
- No external data fetching, no API calls, no database

## Key Abstractions

**ResumeItem:**
- Purpose: Represents a single resume entry (job, degree, profile block) as a styled card
- Examples: `.vitepress/components/ResumeItem.vue`
- Pattern: Vue 3 `<script setup>` with TypeScript props (`title`, `subtitle`, `start`, `end`, `location`, `description`); renders HTML description via `v-html`

**ResumeSection:**
- Purpose: Renders a list of `ResumeItem` components from an array of `Resume` objects
- Examples: `.vitepress/components/ResumeSection.vue`
- Pattern: Vue 3 `<script setup>` with typed props interface (`Resume[]`); iterates with `v-for`

**Resume Interface:**
- Purpose: TypeScript interface defining the shape of resume data objects
- Examples: Defined inline in `.vitepress/components/ResumeSection.vue` (lines 5-12)
- Pattern: Exported interface with optional fields: `{ title, subtitle?, start?, end?, location?, description? }`

## Entry Points

**VitePress Config:**
- Location: `.vitepress/config.mts`
- Triggers: VitePress dev server (`npm run docs:dev`) and build (`npm run docs:build`)
- Responsibilities: Defines site metadata, navigation, social links, footer text, theme configuration

**Theme Entry:**
- Location: `.vitepress/theme/index.ts`
- Triggers: VitePress loads this as the custom theme during build and dev
- Responsibilities: Extends DefaultTheme, registers `vitepress-plugin-back-to-top`, globally registers `ResumeItem` and `ResumeSection` components, imports custom CSS

**Content Pages:**
- Location: `index.md`, `resume.md`, `publications.md`
- Triggers: VitePress routes based on file names (`/`, `/resume`, `/publications`)
- Responsibilities: Define page content, layout, and inline data

**CI/CD Entry:**
- Location: `.github/workflows/deploy.yaml`
- Triggers: Push to `main` branch or manual workflow dispatch
- Responsibilities: Build static site and deploy to GitHub Pages

## Error Handling

**Strategy:** No explicit error handling — the site is entirely static with no runtime logic, API calls, or user input processing.

**Patterns:**
- TypeScript `@ts-ignore` comments in `.vitepress/theme/index.ts` (lines 8-9) suppress type errors for `.vue` component imports (VitePress/Vue SFC type resolution limitation)
- VitePress handles build-time errors (broken links, invalid config) via its own CLI output

## Cross-Cutting Concerns

**Logging:** Not applicable — static site with no server-side runtime
**Validation:** Not applicable — no user input or forms
**Authentication:** Not applicable — public static site with no auth
**Styling:** Custom CSS in `.vitepress/theme/styles/custom.css` provides a `.justified` utility class; component-scoped styles in `.vue` files use `<style scoped>` with `:deep()` for nested element styling

---

*Architecture analysis: 2026-02-16*
