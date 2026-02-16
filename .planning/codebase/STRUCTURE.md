# Codebase Structure

**Analysis Date:** 2026-02-16

## Directory Layout

```
miwurster/
├── .github/
│   └── workflows/
│       └── deploy.yaml         # GitHub Actions CI/CD pipeline
├── .vitepress/
│   ├── cache/                  # VitePress dev cache (gitignored)
│   ├── components/             # Custom Vue components
│   │   ├── ResumeItem.vue      # Single resume entry card
│   │   └── ResumeSection.vue   # List of resume items
│   ├── dist/                   # Build output (gitignored)
│   ├── theme/
│   │   ├── styles/
│   │   │   └── custom.css      # Global custom CSS overrides
│   │   └── index.ts            # Theme entry point
│   └── config.mts              # VitePress site configuration
├── .planning/                  # GSD planning documents
│   └── codebase/               # Codebase analysis docs
├── index.md                    # Homepage (uses VPTeamPage layout)
├── publications.md             # Publications listing page
├── resume.md                   # Resume page (uses custom Vue components)
├── package.json                # npm scripts and dependencies
├── package-lock.json           # Dependency lockfile
├── README.md                   # GitHub profile README
├── LICENSE                     # Project license
└── .gitignore                  # Git ignore rules
```

## Directory Purposes

**`.github/workflows/`:**
- Purpose: CI/CD automation
- Contains: GitHub Actions workflow files
- Key files: `deploy.yaml` — builds VitePress site and deploys to GitHub Pages

**`.vitepress/`:**
- Purpose: VitePress configuration, theme, and custom components
- Contains: Site config, theme customization, Vue components, build cache/output
- Key files: `config.mts` (site config), `theme/index.ts` (theme entry)

**`.vitepress/components/`:**
- Purpose: Custom Vue 3 SFC components used in Markdown pages
- Contains: `.vue` files with `<script setup lang="ts">`, `<template>`, and `<style scoped>` blocks
- Key files: `ResumeItem.vue`, `ResumeSection.vue`

**`.vitepress/theme/`:**
- Purpose: Theme customization extending VitePress DefaultTheme
- Contains: Theme entry point and custom CSS
- Key files: `index.ts` (registers plugins and components), `styles/custom.css`

**`.vitepress/cache/`:**
- Purpose: VitePress development server dependency cache
- Contains: Pre-bundled dependencies for dev mode
- Generated: Yes
- Committed: No (gitignored)

**`.vitepress/dist/`:**
- Purpose: Static site build output
- Contains: Generated HTML, CSS, JS for deployment
- Generated: Yes
- Committed: No (gitignored)

**Project root (`/`):**
- Purpose: Content pages (Markdown files that become site routes)
- Contains: `.md` files, project config files, license
- Key files: `index.md` (→ `/`), `resume.md` (→ `/resume`), `publications.md` (→ `/publications`)

## Key File Locations

**Entry Points:**
- `.vitepress/config.mts`: VitePress site configuration (title, nav, social links, footer)
- `.vitepress/theme/index.ts`: Theme entry — extends DefaultTheme, registers components and plugins
- `index.md`: Homepage content
- `resume.md`: Resume page content with inline Vue `<script setup>` data
- `publications.md`: Publications listing

**Configuration:**
- `.vitepress/config.mts`: Site metadata, navigation, social links, theme settings
- `package.json`: npm scripts (`docs:dev`, `docs:build`, `docs:preview`) and devDependencies
- `.gitignore`: Comprehensive ignore rules for Node, macOS, JetBrains, VS Code

**Core Logic:**
- `.vitepress/components/ResumeItem.vue`: Renders a single resume entry card with title, subtitle, dates, location, and HTML description
- `.vitepress/components/ResumeSection.vue`: Iterates over a `Resume[]` array and renders each item via `ResumeItem`
- `.vitepress/theme/index.ts`: Globally registers Vue components and initializes the back-to-top plugin

**Styling:**
- `.vitepress/theme/styles/custom.css`: Global utility CSS (`.justified` class for text alignment)
- `.vitepress/components/ResumeItem.vue`: Scoped component styles for resume cards (`.box`, `.box-header`, `.title`, `.subtitle`, `.date`, `.location`, `.description`)
- `.vitepress/components/ResumeSection.vue`: Empty scoped styles (no custom styling)

**CI/CD:**
- `.github/workflows/deploy.yaml`: GitHub Actions workflow — build and deploy to GitHub Pages

## Naming Conventions

**Files:**
- Markdown content pages: `lowercase.md` (e.g., `index.md`, `resume.md`, `publications.md`)
- Vue components: `PascalCase.vue` (e.g., `ResumeItem.vue`, `ResumeSection.vue`)
- TypeScript config: `config.mts` (VitePress convention with `.mts` extension for ESM)
- Theme entry: `index.ts` (standard entry point convention)
- CSS files: `lowercase.css` (e.g., `custom.css`)
- CI workflows: `lowercase.yaml` (e.g., `deploy.yaml`)

**Directories:**
- VitePress convention: `.vitepress/` (dot-prefixed, lowercase)
- Subdirectories: `lowercase/` (e.g., `components/`, `theme/`, `styles/`, `workflows/`)

**Components:**
- Use PascalCase for component names matching filenames: `ResumeItem`, `ResumeSection`
- Props use camelCase: `title`, `subtitle`, `start`, `end`, `location`, `description`

**CSS Classes:**
- Use lowercase kebab-like names: `.box`, `.box-header`, `.title`, `.subtitle`, `.date`, `.location`, `.description`, `.justified`

## Where to Add New Code

**New Content Page:**
- Create a new `.md` file at project root (e.g., `projects.md`)
- Add navigation link in `.vitepress/config.mts` under `themeConfig.nav`
- Use VitePress Markdown features and/or reference custom Vue components in the Markdown body

**New Vue Component:**
- Create a `.vue` file in `.vitepress/components/` using PascalCase naming
- Use `<script setup lang="ts">` with typed `defineProps`
- Register globally in `.vitepress/theme/index.ts` via `app.component('ComponentName', Component)`
- Or import directly in a Markdown `<script setup>` block

**New CSS Styles:**
- Global utility styles: add to `.vitepress/theme/styles/custom.css`
- Component-specific styles: use `<style scoped>` within the `.vue` component file
- Use `:deep()` selector to style nested elements within `v-html` content

**New Plugin:**
- Install via npm (`npm install <package>`)
- Initialize in `.vitepress/theme/index.ts` within the `enhanceApp` function

**New CI/CD Workflow:**
- Create a new `.yaml` file in `.github/workflows/`

## Special Directories

**`.vitepress/cache/`:**
- Purpose: VitePress pre-bundled dependency cache for dev server
- Generated: Yes (by `vitepress dev`)
- Committed: No (gitignored via `.vitepress/cache`)

**`.vitepress/dist/`:**
- Purpose: Static site build output for deployment
- Generated: Yes (by `vitepress build`)
- Committed: No (gitignored via `.vitepress/dist`)

**`node_modules/`:**
- Purpose: npm dependency installation directory
- Generated: Yes (by `npm install` / `npm ci`)
- Committed: No (gitignored)

**`.planning/`:**
- Purpose: GSD planning and codebase analysis documents
- Generated: By GSD tooling
- Committed: Yes

---

*Structure analysis: 2026-02-16*
