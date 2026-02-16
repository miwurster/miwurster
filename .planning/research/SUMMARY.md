# Project Research Summary

**Project:** CollapsibleResumeItem
**Domain:** Vue 3 collapsible UI component for VitePress static resume site
**Researched:** 2026-02-16
**Confidence:** HIGH

## Executive Summary

This project adds a collapsible expand/collapse component to a VitePress resume site. The component wraps Profile and Skills sections (currently static `ResumeItem` cards) in a new `CollapsibleResumeItem` that starts collapsed with a one-line preview and fade-out, reveals full content via smooth height animation on click, and provides a rotating chevron as visual affordance. This is a well-understood UI pattern with one central technical challenge: **animating to an unknown content height** (CSS cannot transition `height: auto`).

The recommended approach is a **standalone Vue 3 component** using the CSS `grid-template-rows: 0fr → 1fr` trick for smooth height animation — zero JavaScript DOM measurement, zero dependencies, full SSR compatibility. The architecture research also validated a `max-height` + `scrollHeight` measurement approach as a solid alternative. Both work; the grid approach is simpler. The component follows existing codebase conventions exactly: `<script setup lang="ts">`, `<style scoped>`, global registration in `theme/index.ts`, and consumption directly in `resume.md` via Markdown.

The key risks are SSR hydration mismatches (initial render must be deterministic — no browser APIs outside `onMounted`) and scoped style leakage with `v-html` content (must use `:deep()` selectors, following the existing `ResumeItem.vue` pattern). Both are well-documented, well-understood, and preventable with discipline. The project has no external dependencies, no complex state management, and a linear build order — making it a low-risk, single-phase implementation.

## Key Findings

### Recommended Stack

The entire implementation uses **zero new dependencies**. Everything needed is already in the project: Vue 3 Composition API, CSS transitions, and VitePress's component system.

**Core technologies:**
- **CSS `grid-template-rows: 0fr/1fr`**: Height animation — solves the `height: auto` problem without JavaScript measurement; `fr` units are interpolatable CSS lengths
- **Vue 3 `<script setup lang="ts">`**: Component authoring — matches existing codebase convention exactly
- **CSS `::after` pseudo-element + `linear-gradient`**: Fade overlay on collapsed preview — uses `var(--vp-c-bg)` for automatic light/dark theme support
- **CSS border triangle**: Chevron indicator — no icon library, rotates cleanly via `transform: rotate()` with transition

**Explicitly rejected:** Vue `<Transition>` component (wrong tool — designed for enter/leave, not height animation), animation libraries (GSAP, Motion — overkill for one component), `interpolate-size` CSS property (Chromium-only, not production-ready), `max-height: 9999px` hack (broken easing curve), `<details>/<summary>` HTML elements (no smooth animation).

See [STACK.md](./STACK.md) for full rationale and code patterns.

### Expected Features

**Must have (table stakes):**
- Toggle expand/collapse on click — core behavior
- Start collapsed by default — stated requirement
- Collapsed preview (~1 line with fade) — makes collapsed state useful
- Chevron indicator with rotation — standard visual affordance
- Smooth height animation — stated requirement
- Works with `v-html` content (arbitrary HTML) — existing content delivery pattern
- Accessible keyboard interaction — `<button>` with Enter/Space; near-zero cost

**Should have (low-cost polish):**
- ARIA attributes (`aria-expanded`, `aria-controls`) — trivial alongside keyboard support
- Configurable preview height prop — one line, helps tune per-section
- Reduced motion support (`prefers-reduced-motion`) — one CSS media query
- Print-friendly (expand all on print) — high value for a resume site, one CSS media query

**Defer (v2+):**
- Persist expanded state across navigation — unnecessary for single-page usage
- "Show more" / "Show less" text label — chevron + cursor change suffices
- Transition on first render (FOUC prevention) — only if actually observed

See [FEATURES.md](./FEATURES.md) for full feature landscape and dependency graph.

### Architecture Approach

`CollapsibleResumeItem` is a **standalone sibling component** to `ResumeItem` — not a wrapper, not a prop flag, not a subclass. It lives in `.vitepress/components/`, is globally registered, and accepts `title` and `description` props. All collapsible behavior (state, animation, preview/fade, chevron) is internal. Existing components (`ResumeItem`, `ResumeSection`) are completely untouched.

**Major components:**
1. **CollapsibleResumeItem.vue** — New. Collapsible card: clickable header (title + chevron), preview with fade when collapsed, animated content reveal. Owns `expanded` ref internally.
2. **ResumeItem.vue** — Unchanged. Static content card for Experience/Education items.
3. **ResumeSection.vue** — Unchanged. Iterates `Resume[]` array, renders `ResumeItem` for each.
4. **theme/index.ts** — Modified. Adds one `app.component()` registration line.
5. **resume.md** — Modified. Replaces two `<ResumeItem>` usages (Profile, Skills) with `<CollapsibleResumeItem>`.

**Key patterns:** Single `.expanded` class on root element drives all CSS transitions (chevron rotation, content height, fade visibility). Data flow is strictly one-way (props down, no events up). No shared state between components.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full component boundaries, data flow, and integration points.

### Critical Pitfalls

1. **CSS `height: auto` is not transitionable** — Use `grid-template-rows: 0fr/1fr` (preferred) or `max-height` with measured `scrollHeight`. Never attempt `transition: height` with `auto` as target.
2. **SSR hydration mismatch** — Initial render must produce identical HTML on server and client. Use `ref(false)` for deterministic collapsed state. All DOM access (`scrollHeight`, `window`) must be inside `onMounted` or event handlers, never in top-level `<script setup>`. Always verify with `docs:build && docs:preview`, not just `docs:dev`.
3. **`v-html` content invisible to scoped styles** — Vue's `<style scoped>` adds `data-v-xxxxx` attributes at compile time; `v-html` bypasses the compiler. Must use `:deep()` selectors (existing pattern in `ResumeItem.vue`) or style wrapper elements directly.
4. **`overflow: hidden` clips box-shadow** — Apply `overflow: hidden` to an inner content wrapper, not the outer `.box` container that has decorative styles (shadow, border-radius).
5. **Chevron animation desync** — Use identical `transition-duration` and `transition-timing-function` for both chevron rotation and content height animation. Drive both from the single `expanded` ref.

See [PITFALLS.md](./PITFALLS.md) for all 10 pitfalls with phase-specific warnings.

## Implications for Roadmap

This is a small, self-contained project with a linear dependency chain. Research strongly suggests **two phases**: one implementation phase and one polish/verification phase.

### Phase 1: Core Component Implementation

**Rationale:** All table-stakes features share a single dependency chain (toggle → preview → animation → accessibility) and affect the same files. The architecture research confirms steps 1-3 (create component, register, integrate) are tightly coupled and should be done together.

**Delivers:** Fully functional `CollapsibleResumeItem` component integrated into the resume page, replacing the static Profile and Skills `ResumeItem` usages.

**Addresses features:**
- Toggle expand/collapse on click
- Start collapsed by default
- Collapsed preview with fade overlay
- Chevron indicator with rotation
- Smooth height animation (CSS grid approach)
- Works with `v-html` content
- Accessible keyboard interaction (button element, Enter/Space)
- ARIA attributes (`aria-expanded`, `aria-controls`)

**Avoids pitfalls:**
- Height animation: use `grid-template-rows: 0fr/1fr` from the start (Pitfall 1)
- SSR: deterministic initial state, DOM access only in `onMounted` (Pitfall 2)
- Scoped styles: use `:deep()` for `v-html` content (Pitfall 3)
- Overflow: inner wrapper for `overflow: hidden` (Pitfall 4)
- Animation sync: shared duration/easing for chevron and content (Pitfall 6)

**Files created:** `.vitepress/components/CollapsibleResumeItem.vue`
**Files modified:** `.vitepress/theme/index.ts`, `resume.md`
**Files unchanged:** `ResumeItem.vue`, `ResumeSection.vue`, `custom.css`, `config.mts`, `package.json`

### Phase 2: Polish and Cross-Environment Verification

**Rationale:** These are low-effort enhancements that should only be done after the core component is working and visually verified. Print styles and reduced-motion support can't be meaningfully tested until the animation exists.

**Delivers:** Production-ready component with accessibility polish and cross-environment verification.

**Addresses features:**
- Configurable preview height prop (with sensible default)
- Reduced motion support (`prefers-reduced-motion` media query)
- Print-friendly styles (expand all content on print)
- Animation timing/easing refinement

**Verification tasks:**
- Run `npm run docs:build && npm run docs:preview` to verify SSR (Pitfall 2)
- Test light/dark theme (fade overlay uses `--vp-c-bg`)
- Test keyboard navigation (Tab, Enter, Space)
- Visual check of animation smoothness and chevron sync

### Phase Ordering Rationale

- **Phase 1 before Phase 2** because polish features (print styles, reduced motion, configurable height) depend on the base animation and component structure being correct first.
- **Everything in two phases** (not three or four) because the component is small (~100 lines), affects only 3 files, and has no external dependencies. Splitting further would create overhead without value.
- **No separate "design" phase** because the architecture research already resolved all design decisions: standalone component, CSS grid animation, pseudo-element fade, CSS border chevron, single `.expanded` class for state.

### Research Flags

**Phases with standard patterns (skip `/gsd-research-phase`):**
- **Phase 1:** All patterns are well-documented — CSS grid height animation, Vue composition API, VitePress component registration, ARIA disclosure widget. The research files contain complete code examples. No further research needed.
- **Phase 2:** CSS media queries for print and reduced motion are trivial, well-documented patterns. No research needed.

**No phases need deeper research.** This is a solved problem space with high-confidence patterns across all four research dimensions.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Pure CSS technique verified against MDN, Vue docs, VitePress docs. Grid `0fr/1fr` trick is mechanically sound per CSS spec. Zero dependencies = zero compatibility risk. |
| Features | HIGH | Codebase analysis provided clear requirements. Feature landscape is bounded — collapsible UI is a mature pattern with well-known table stakes. |
| Architecture | HIGH | Direct source code inspection of existing components. Standalone component decision is clear-cut — ResumeItem's structure doesn't map to collapsible behavior. |
| Pitfalls | HIGH | All critical pitfalls verified against official Vue 3 and VitePress documentation. The `height: auto` limitation is universally documented. SSR hydration rules are spec-level. |

**Overall confidence:** HIGH

### Gaps to Address

- **Grid `0fr/1fr` vs. `max-height` + `scrollHeight`:** STACK.md recommends the grid approach; ARCHITECTURE.md recommends `max-height` with `scrollHeight` measurement. Both work. **Resolution: use the grid approach** — it's simpler (no `onMounted` measurement, no `scrollHeight`), has no timing edge cases, and produces equivalent visual results. The `max-height` approach is a valid fallback if any grid animation issue is discovered during implementation.
- **Collapsed preview height value:** Research suggests ~1-1.5em but the exact value depends on how Profile (paragraphs) and Skills (bullet list) content renders visually. **Resolution: pick a default, tune during Phase 2** via the configurable prop.
- **FOUC on first render:** Feature research flags this as a potential issue but uncertain whether VitePress hydration timing actually causes it. **Resolution: observe during Phase 1, address in Phase 2 only if visible.**

## Sources

### Primary (HIGH confidence)
- Vue.js official docs: Transition component — https://vuejs.org/guide/built-ins/transition.html
- Vue.js official docs: Animation Techniques — https://vuejs.org/guide/extras/animation.html
- Vue 3 SSR docs — https://vuejs.org/guide/scaling-up/ssr.html
- VitePress docs: Using Vue in Markdown — https://vitepress.dev/guide/using-vue
- VitePress docs: SSR Compatibility — https://vitepress.dev/guide/ssr-compat
- MDN: `interpolate-size` — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interpolate-size
- MDN: CSS Transitions — https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using
- WAI-ARIA Authoring Practices: Disclosure Widget — W3C specification
- Existing codebase: `ResumeItem.vue`, `ResumeSection.vue`, `theme/index.ts`, `resume.md`

### Secondary (MEDIUM confidence)
- CSS `grid-template-rows: 0fr/1fr` technique — widely documented community pattern, mechanically sound per CSS Grid spec (`fr` is an interpolatable length)

---
*Research completed: 2026-02-16*
*Ready for roadmap: yes*
