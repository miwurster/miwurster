# Coding Conventions

**Analysis Date:** 2026-02-16

## Naming Patterns

**Files:**
- Vue components: PascalCase (e.g., `ResumeItem.vue`, `ResumeSection.vue`)
- TypeScript files: camelCase with `.ts` extension (e.g., `index.ts`)
- Config files: camelCase with `.mts` extension for VitePress config (e.g., `config.mts`)
- Markdown content files: kebab-case or single lowercase word (e.g., `resume.md`, `publications.md`, `index.md`)
- CSS files: kebab-case (e.g., `custom.css`)

**Functions:**
- camelCase for function names and method names (e.g., `enhanceApp`, `defineProps`, `defineConfig`)

**Variables:**
- camelCase for local variables and constants (e.g., `experience`, `education`, `profile`, `skills`, `members`)
- Data arrays use plural nouns (e.g., `members`, `experience`, `education`)

**Types/Interfaces:**
- PascalCase for TypeScript interfaces (e.g., `Resume` in `.vitepress/components/ResumeSection.vue`)
- Interfaces exported directly from `<script setup>` blocks

**CSS Classes:**
- kebab-case for CSS class names (e.g., `box-header`, `back-to-top`)
- Single-word classes where possible (e.g., `box`, `title`, `subtitle`, `date`, `location`, `description`)
- Semantic naming reflecting content purpose, not visual appearance

## Code Style

**Formatting:**
- No dedicated formatter configured (no `.prettierrc`, no `biome.json`)
- Implicit reliance on editor defaults
- Use 2-space indentation in TypeScript, Vue, and config files
- No trailing commas enforced, but trailing commas are used in arrays and object literals (see `.vitepress/config.mts`)
- Semicolons are omitted in Vue `<script setup>` blocks but present in config files — inconsistent

**Linting:**
- No ESLint or other linter configured
- No `.eslintrc`, `eslint.config.*`, or similar files exist
- Code quality relies on developer discipline and IDE defaults

## Import Organization

**Order:**
1. Framework/library type imports (`import type {Theme} from "vitepress"`)
2. Framework/library value imports (`import DefaultTheme from "vitepress/theme"`)
3. Third-party plugin imports (`import vitepressBackToTop from "vitepress-plugin-back-to-top"`)
4. CSS/style imports (`import "vitepress-plugin-back-to-top/dist/style.css"`)
5. Local component imports (`import ResumeItem from "../components/ResumeItem.vue"`)

**Path Style:**
- Relative paths for local imports (e.g., `"../components/ResumeItem.vue"`, `"./styles/custom.css"`)
- Package names for external imports (e.g., `"vitepress"`, `"vue"`)
- No path aliases configured (no `tsconfig.json` with path mappings)

**Quotes:**
- Double quotes for import paths in TypeScript files
- Single quotes for import paths in Markdown `<script setup>` blocks — inconsistent

## Vue Component Patterns

**Script Setup:**
- All Vue components use `<script setup lang="ts">` (Composition API with TypeScript)
- Props defined using `defineProps<{...}>()` with TypeScript generics (type-based declaration)
- No `defineEmits` usage (components are display-only)

**Template:**
- Use `v-if` / `v-else-if` for conditional rendering
- Use `v-for` with `:key` for list rendering
- Use `v-html` for rendering raw HTML content (trusted content only — resume data is hardcoded)
- Attribute binding uses shorthand (`:title` not `v-bind:title`)

**Style:**
- `<style scoped>` for component-level styles
- `:deep()` selector for styling slotted/child content (e.g., `:deep(.description ul)`)
- CSS units: `rem` for font sizes and spacing, `px` for borders and padding

**Component Registration:**
- Global registration via `app.component()` in `.vitepress/theme/index.ts`
- Used directly in Markdown files without import (e.g., `<ResumeItem>`, `<ResumeSection>`)

## Content Authoring Patterns

**Markdown Files:**
- YAML frontmatter for metadata (`title`, `layout`, `footer`)
- Inline `<script setup>` blocks for data definitions
- Data defined as JavaScript arrays/objects with HTML string literals for rich content
- HTML embedded directly in template literal strings (backtick strings with `<ul>`, `<li>`, `<blockquote>`)
- VitePress built-in components used directly (e.g., `VPTeamPage`, `VPTeamMembers`)
- Custom components used directly (e.g., `<ResumeItem>`, `<ResumeSection>`)

## Error Handling

**Patterns:**
- No explicit error handling — this is a static site with no runtime logic
- `// @ts-ignore` used to suppress TypeScript errors for Vue component imports in `.vitepress/theme/index.ts` (lines 9-11)

## Logging

**Framework:** Not applicable — static site, no runtime logging

## Comments

**When to Comment:**
- Comments are minimal and used sparingly
- URL references to documentation placed above relevant config (e.g., `// https://vitepress.dev/reference/site-config`)
- Commented-out code left in place for future reference (e.g., commented `lastUpdated`, `footer.message`, social link in `.vitepress/config.mts`)
- `@ts-ignore` comments used without explanation

**JSDoc/TSDoc:**
- Not used

## Module Design

**Exports:**
- Default exports for Vue components (implicit via `<script setup>`)
- Default export for VitePress config (`export default defineConfig({...})`)
- Default export with `satisfies Theme` for theme configuration
- Named export for interfaces (`export interface Resume` in `ResumeSection.vue`)

**Barrel Files:**
- Not used

---

*Convention analysis: 2026-02-16*
