# Codebase Concerns

**Analysis Date:** 2026-02-16

## Tech Debt

**Unclosed HTML Tags in Resume Content:**
- Issue: `resume.md` contains 31 `<li>` tags but zero closing `</li>` tags, and has mismatched `<ul>`/`</ul>` (5 opening, 4 closing). While browsers auto-close `<li>` elements, this is invalid HTML that may cause rendering issues in edge cases and makes the content harder to maintain.
- Files: `resume.md`
- Impact: Potential rendering glitches; harder to parse and edit content reliably.
- Fix approach: Add closing `</li>` tags to all list items and balance the `<ul>`/`</ul>` tags.

**Broken Words from PDF Copy-Paste Artifacts:**
- Issue: Resume content contains words broken with hyphens that appear to be copy-paste artifacts from a PDF source: "Architec-ture", "Post-greSQL", "Py-thon", "produc-tion", "Kuber-netes", "work-flows", "func-tional", "experi-ence". These render as visibly hyphenated words on the site.
- Files: `resume.md` (lines 20, 22, 23, 24, 41, 42)
- Impact: Broken words display on the live site, making the resume look unprofessional.
- Fix approach: Remove mid-word hyphens and join the word fragments (e.g., "Architec-ture" → "Architecture").

**@ts-ignore Directives for Vue Component Imports:**
- Issue: Two `// @ts-ignore` comments suppress TypeScript errors when importing `.vue` files. This indicates missing type declarations for `.vue` single-file components.
- Files: `.vitepress/theme/index.ts` (lines 8, 10)
- Impact: TypeScript cannot type-check these imports, masking potential errors.
- Fix approach: Add a `shims-vue.d.ts` (or `env.d.ts`) declaration file with `declare module '*.vue'` to provide proper TypeScript module declarations for Vue SFCs.

**Inline HTML in Markdown Content Files:**
- Issue: `resume.md` embeds large blocks of raw HTML (`<ul>`, `<li>`, `<blockquote>`, `<p>`, `<br>`) within `<script setup>` template literals instead of using structured data and Vue component templates. This makes content hard to edit, prone to formatting bugs, and mixes concerns.
- Files: `resume.md` (lines 13-26, 34-46, 54-62, 70-79, 88-92, 96-102, 106-114, 116-131)
- Impact: Content is fragile to edit; no syntax highlighting or linting for inline HTML strings; risk of introducing broken HTML.
- Fix approach: Restructure data to use plain objects with arrays of strings for bullet points, and render HTML in the Vue component templates (`ResumeItem.vue`, `ResumeSection.vue`) rather than in the data layer.

## Known Bugs

**No Known Runtime Bugs Detected.**

## Security Considerations

**Use of `v-html` Directive:**
- Risk: `v-html` renders raw HTML without sanitization, which can lead to XSS (cross-site scripting) if the content source is ever untrusted.
- Files: `.vitepress/components/ResumeItem.vue` (line 33)
- Current mitigation: All `v-html` content currently comes from hardcoded string literals in `resume.md`, not from user input or external sources, so the XSS risk is effectively zero in the current setup.
- Recommendations: If the site ever accepts dynamic content or user-generated input, replace `v-html` with structured rendering or sanitize HTML before rendering. Add a code comment documenting that the content source is trusted.

**npm Audit Vulnerabilities (4 total):**
- Risk: The dependency tree contains 4 known vulnerabilities: 1 high (preact), 3 moderate (esbuild, mdast-util-to-hast, vite). All are transitive dependencies of `vitepress`.
- Files: `package.json`, `package-lock.json`
- Current mitigation: These are dev/build dependencies; the built static site does not ship vulnerable code to end users.
- Recommendations: Update `vitepress` from `1.6.3` to `1.6.4` (available now) which may resolve some vulnerabilities. Run `npm audit fix` to apply fixes.

**Email Address Exposed in Source:**
- Risk: The email `miwurster@gmail.com` is hardcoded in both `index.md` (line 26) and `.vitepress/config.mts` (line 26). While intentional for a personal site, it can be harvested by spam bots.
- Files: `index.md` (line 26), `.vitepress/config.mts` (line 26)
- Current mitigation: None.
- Recommendations: Consider using a contact form or obfuscating the email if spam becomes an issue. Acceptable as-is for a personal portfolio.

## Performance Bottlenecks

**No Significant Performance Issues Detected.**

The site is a simple static VitePress build with minimal custom components and no API calls. Build and runtime performance are not a concern.

## Fragile Areas

**Resume Content in `resume.md`:**
- Files: `resume.md`
- Why fragile: All resume content is embedded as raw HTML strings inside JavaScript template literals within a `<script setup>` block. Any unescaped backtick, mismatched HTML tag, or stray character in the template literal breaks the entire page build.
- Safe modification: Edit one experience/education block at a time. Verify the build succeeds after each edit with `npm run docs:build`. Avoid backtick characters within the content strings.
- Test coverage: No tests exist for this site (see Test Coverage Gaps).

**Hardcoded Border Color Without Dark Mode Support:**
- Files: `.vitepress/components/ResumeItem.vue` (line 44)
- Why fragile: The `.box` border uses a hardcoded light color (`#e1e9ee`) that does not adapt to VitePress dark mode. The border and box-shadow become invisible or look wrong in dark mode.
- Safe modification: Replace with VitePress CSS variables (e.g., `var(--vp-c-divider)` for borders, `var(--vp-shadow-1)` for shadows).
- Test coverage: No visual regression tests.

## Scaling Limits

**Not Applicable.** This is a static personal website. No scaling concerns.

## Dependencies at Risk

**Loose Version Pinning:**
- Risk: `package.json` uses `"vitepress": "^1"` and `"vitepress-plugin-back-to-top": "^1"` which allow any minor or patch version within major version 1. A breaking change in a minor release could cause unexpected build failures.
- Files: `package.json` (lines 8-9)
- Impact: Builds may break unexpectedly when `npm install` pulls a newer version.
- Migration plan: Pin to more specific ranges (e.g., `"^1.6.3"`) or use exact versions. The `package-lock.json` mitigates this for reproducible installs via `npm ci`.

**Outdated VitePress:**
- Risk: Currently on `1.6.3`; version `1.6.4` is available with potential security fixes.
- Files: `package.json`, `package-lock.json`
- Impact: Missing security patches and bug fixes.
- Migration plan: Run `npm update vitepress` to update.

## Missing Critical Features

**No SEO Meta Tags:**
- Problem: `.vitepress/config.mts` does not configure Open Graph (`og:`) or Twitter Card meta tags. Social media shares and search engine results will lack rich previews.
- Files: `.vitepress/config.mts`
- Blocks: Professional appearance when the site URL is shared on LinkedIn, Twitter, or Slack.

**No Responsive Styles for Resume Layout:**
- Problem: The `.box-header` in `ResumeItem.vue` uses `display: flex` with `justify-content: space-between` but has no `@media` queries or `flex-wrap` for small screens. On mobile, the title and date columns may overlap or get cramped.
- Files: `.vitepress/components/ResumeItem.vue` (lines 51-55)
- Blocks: Clean mobile display of resume content.

**No Accessibility Attributes:**
- Problem: Custom Vue components (`ResumeItem.vue`, `ResumeSection.vue`) have no ARIA attributes (`aria-label`, `role`, etc.). The resume section lacks semantic HTML structure (using `<div>` wrappers instead of `<article>` or `<section>`).
- Files: `.vitepress/components/ResumeItem.vue`, `.vitepress/components/ResumeSection.vue`
- Blocks: Screen reader usability and accessibility compliance.

## Test Coverage Gaps

**No Tests Exist:**
- What's not tested: The entire codebase has zero test files. No unit tests, no component tests, no build verification tests, no link checking.
- Files: All files in `.vitepress/components/`, `resume.md`, `publications.md`, `index.md`
- Risk: Broken links, rendering regressions, and invalid HTML can ship to production undetected. The only validation is a successful VitePress build in the CI pipeline (`.github/workflows/deploy.yaml`).
- Priority: Low. This is a small static personal site with minimal logic. The VitePress build step catches major issues (missing imports, syntax errors). Adding a link checker or HTML validator to CI would provide the most value with minimal effort.

---

*Concerns audit: 2026-02-16*
