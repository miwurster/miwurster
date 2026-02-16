# CollapsibleResumeItem

## What This Is

A Vue 3 component for the personal resume site that makes the Profile and Skills sections collapsible. The component starts collapsed with a first-line preview and gradient fade, expands/collapses smoothly on click with a rotating chevron indicator. Integrated into the live VitePress resume page.

## Core Value

The resume page becomes scannable — readers see section headings with a content preview and can expand only what interests them, reducing visual overload.

## Current State

**Shipped:** v1.0 (2026-02-16)
**Codebase:** ~144 lines added across 3 files (Vue 3 + TypeScript)
**Tech stack:** VitePress, Vue 3 Composition API, CSS transitions

The CollapsibleResumeItem component is built, globally registered, and integrated into the resume page for Profile and Skills sections. Both sections collapse by default on page load.

## Requirements

### Validated

- ✓ CollapsibleResumeItem Vue component with expand/collapse behavior — v1.0
- ✓ Collapsed state shows first ~1 line of content with gradient fade-out — v1.0
- ✓ Clickable header row with rotating chevron indicator — v1.0
- ✓ Smooth CSS slide animation for expand/collapse transitions — v1.0
- ✓ Profile and Skills sections use CollapsibleResumeItem on resume page — v1.0
- ✓ Component starts collapsed by default on page load — v1.0
- ✓ HTML content rendered via v-html in both states — v1.0
- ✓ Component globally registered in VitePress theme — v1.0

### Active

(None — next milestone requirements to be defined via `/gsd-new-milestone`)

### Out of Scope

- Collapsible behavior for Experience or Education sections — those are multi-item lists via `ResumeSection` and need different treatment
- Persisting expand/collapse state across page navigations — static site, no state management
- Accordion group behavior (mutual exclusion) — Profile and Skills are independent; collapsing one when other opens worsens UX

## Context

Shipped v1.0 with 144 LOC across 3 files (TypeScript/Vue).
Tech stack: VitePress, Vue 3 Composition API (`<script setup>`), CSS transitions (max-height).
No external dependencies added — all animation via CSS, chevron via CSS border triangle.
User visually verified and approved both phases on live dev server.

**Potential next areas:**
- Accessibility (keyboard support already works via `<button>`, but ARIA attributes and prefers-reduced-motion not yet implemented)
- Polish (configurable preview height, print styles, dark/light theme fade)

## Constraints

- **Tech stack**: Must use Vue 3 Composition API (`<script setup>`) with TypeScript, consistent with existing components
- **No new dependencies**: Use CSS transitions for animation, no animation libraries
- **VitePress compatibility**: Component must work with VitePress's SSR/static build pipeline
- **Styling**: Match existing `.box` card styling from `ResumeItem.vue`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Separate component vs. prop on ResumeItem | Keeps ResumeItem simple and unchanged; collapsible behavior is a distinct concern | ✓ Good — clean separation, no regressions |
| CSS max-height transition (not grid 0fr/1fr) | Grid approach doesn't support partial-collapse preview (showing ~1 line) | ✓ Good — smooth animation with preview |
| Chevron via CSS border triangle (not icon library) | No new dependencies for a single icon | ✓ Good — zero bundle impact |
| Header as `<button>` element | Free keyboard support (Enter/Space), focus ring, and screen reader semantics | ✓ Good — accessibility by default |
| Keep ## markdown headers alongside component | Section headers preserve page structure and navigation | ✓ Good — clean page outline |

---
*Last updated: 2026-02-16 after v1.0 milestone*
