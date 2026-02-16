# CollapsibleResumeItem

## What This Is

A new Vue component for the personal resume site that makes the Profile and Skills sections collapsible. These sections currently render as static content boxes via `ResumeItem`, but will be wrapped in a `CollapsibleResumeItem` component that starts collapsed, shows a first-line preview with fade, and expands/collapses smoothly when the user clicks the header row.

## Core Value

The resume page becomes scannable — readers see section headings with a content preview and can expand only what interests them, reducing visual overload.

## Requirements

### Validated

- ✓ Resume page renders Profile, Skills, Experience, Education sections — existing
- ✓ `ResumeItem` component displays structured content cards — existing
- ✓ `ResumeSection` component renders lists of `ResumeItem` — existing
- ✓ VitePress static site builds and deploys via GitHub Actions — existing

### Active

- [ ] New `CollapsibleResumeItem` Vue component with expand/collapse behavior
- [ ] Collapsed state shows first ~1 line of content with a fade-out effect
- [ ] Clickable header row with chevron icon that rotates on expand/collapse
- [ ] Smooth slide animation for expand/collapse transitions
- [ ] Both Profile and Skills sections use `CollapsibleResumeItem` instead of `ResumeItem`
- [ ] Component starts collapsed by default on page load

### Out of Scope

- Collapsible behavior for Experience or Education sections — those are multi-item lists via `ResumeSection` and need different treatment
- Persisting expand/collapse state across page navigations — static site, no state management
- Accessibility beyond basic keyboard support — can be added later if needed

## Context

- The site is a VitePress static site with Vue 3 components in `.vitepress/components/`
- Components are globally registered in `.vitepress/theme/index.ts`
- Profile and Skills are rendered in `resume.md` as `<ResumeItem :description="profile"/>` and `<ResumeItem :description="skills"/>`
- Content is raw HTML strings passed via the `description` prop and rendered with `v-html`
- No external dependencies for animation — CSS transitions are sufficient for this use case

## Constraints

- **Tech stack**: Must use Vue 3 Composition API (`<script setup>`) with TypeScript, consistent with existing components
- **No new dependencies**: Use CSS transitions for animation, no animation libraries
- **VitePress compatibility**: Component must work with VitePress's SSR/static build pipeline
- **Styling**: Match existing `.box` card styling from `ResumeItem.vue`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Separate component vs. prop on ResumeItem | Keeps ResumeItem simple and unchanged; collapsible behavior is a distinct concern | — Pending |
| CSS transitions for animation | No added bundle size; sufficient for a simple slide effect | — Pending |
| Chevron via CSS/unicode rather than icon library | No new dependencies for a single icon | — Pending |

---
*Last updated: 2026-02-16 after initialization*
