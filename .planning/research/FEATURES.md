# Feature Landscape

**Domain:** Collapsible/accordion UI component for a VitePress resume site
**Researched:** 2026-02-16
**Overall confidence:** HIGH (well-established UI pattern; project constraints are clear from codebase analysis)

## Context

The component wraps HTML content rendered via `v-html` in two sections: Profile (3 paragraphs of justified text) and Skills (a `<ul>` bullet list). It must start collapsed, show a ~1 line preview with a fade-out effect, have a clickable header area with a rotating chevron icon, and animate the expand/collapse transition smoothly.

Key constraint: the content height is **unknown at render time** because it's arbitrary HTML injected via `v-html`. This rules out pure CSS `max-height` tricks with fixed values and makes dynamic height measurement the central technical challenge.

---

## Table Stakes

Features users expect. Missing = component feels broken or unusable.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Toggle expand/collapse on click** | Core behavior — without it, there's no collapsible component | Low | `ref<boolean>` toggled by click handler on the header region |
| **Start collapsed by default** | Stated requirement; resume page should feel compact on load | Low | Default `expanded = false`; configurable via prop if needed later |
| **Collapsed preview (~1 line with fade)** | Without a preview, collapsed state shows nothing — user has no idea what's hidden | Medium | Fixed `max-height` on collapsed container (e.g., `3rem`) with CSS `mask-image` linear-gradient or pseudo-element fade overlay. Must work with both paragraph text and `<ul>` content |
| **Chevron indicator** | Users need visual affordance that the section is interactive; a rotating chevron is the standard pattern | Low | Inline SVG or CSS triangle. Rotate 90deg→0deg (or 0→180) via CSS `transform` with `transition`. No icon library needed |
| **Smooth height animation** | Abrupt show/hide feels jarring and broken | Medium | This is the hardest table-stakes feature. CSS `transition` on `height` requires a known pixel value. Two viable approaches: (1) measure `scrollHeight` with a ref, set explicit `height` in JS, transition between `previewHeight` and `scrollHeight`; (2) use the FLIP animation technique. Approach 1 is simpler and sufficient |
| **Cursor and hover feedback** | Clickable header must look clickable | Low | `cursor: pointer` on the header; optional subtle hover background color or underline |
| **Works with v-html content** | Profile uses `<p>`, Skills uses `<ul>` — component must handle arbitrary HTML, not just text nodes | Low | Already the existing pattern in `ResumeItem.vue`. The collapsible wrapper just wraps the `v-html` div; no content assumptions |
| **Accessible keyboard interaction** | Users navigating by keyboard must be able to toggle sections | Low | Use `<button>` or `role="button"` with `tabindex="0"` on the header. Handle `Enter` and `Space` keypress. Cost is near-zero; omitting this is negligent |

## Differentiators

Features that add polish. Not expected on a personal resume site, but valued if present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **ARIA attributes** (`aria-expanded`, `aria-controls`) | Screen reader users get proper expand/collapse semantics. Low effort, high signal that the author cares about quality | Low | `aria-expanded="true/false"` on the trigger, `aria-controls` pointing to the content `id`. Trivial to add alongside table-stakes keyboard support |
| **Configurable preview height** | Profile paragraphs and Skills bullets have different natural line heights; a prop lets the parent tune the preview | Low | `previewHeight` prop with sensible default (e.g., `3rem`). Pass as inline style to the collapsed container |
| **"Show more" / "Show less" label** | Explicit text label alongside the chevron makes the interaction unambiguous; some users won't recognize the chevron alone | Low | Slot or prop for label text. Toggle between two strings based on expanded state |
| **Transition on first render** | If the page loads with content visible then snaps to collapsed, it's a flash of unstyled content (FOUC). Clean first render means the component initializes in collapsed state without a visible transition | Medium | Initialize with `height` already at preview value before mount. Use `v-show` or conditional style to avoid FOUC. May need a `mounted` lifecycle hook to measure and set initial height |
| **Reduced motion support** | Respects `prefers-reduced-motion` media query by disabling or shortening animations | Low | CSS `@media (prefers-reduced-motion: reduce) { transition-duration: 0s; }`. Near-zero effort |
| **Persist expanded state across navigation** | If a user expands Profile, navigates away, and comes back, it stays expanded | Low-Medium | Store state in a lightweight composable or `sessionStorage`. Nice but arguably unnecessary for a resume site with only one page using the component |
| **Print-friendly: expand all when printing** | Resume pages are commonly printed; collapsed content would be hidden in print | Low | `@media print { .collapsible-content { height: auto !important; overflow: visible !important; } }`. Small effort, meaningful for a resume site specifically |

## Anti-Features

Features to explicitly NOT build. Over-engineering for this use case.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Accordion group behavior** (only one section open at a time) | Profile and Skills are independent sections on the page. Forcing mutual exclusion adds complexity and worsens UX — users may want both open | Build each collapsible as a standalone component with independent state |
| **Drag-to-resize collapsed preview** | Massive complexity for zero value on a resume page | Use a fixed or prop-configurable preview height |
| **Animation library dependency** (GSAP, Motion, @vueuse/motion) | The site has zero JS dependencies beyond VitePress. A single collapsible doesn't justify adding a library. Vue's built-in reactivity + CSS transitions handle this fine | Use `ref` + `scrollHeight` measurement + CSS `transition: height` |
| **Nested collapsible sections** | The content inside Profile and Skills is flat HTML. Supporting recursion adds complexity for a feature that will never be used here | Build a single-depth component only |
| **Server-side rendering (SSR) of expanded state** | VitePress does SSR, but the collapsed/expanded state is purely a client-side interaction. Trying to SSR it adds hydration complexity for no benefit | Let the component initialize its state on the client side. Use `onMounted` for height measurement |
| **Slot-based content API** | The existing codebase passes content as HTML strings via `v-html`. Introducing a slot API means refactoring how `resume.md` passes data to components | Accept content via `v-html` prop, matching the existing `description` prop pattern on `ResumeItem` |
| **Multiple transition styles** (slide, fade, zoom) | One animation style is enough. Multiple options = configuration surface area for no user benefit | Use a single slide-down animation (height transition) |
| **URL hash deep-linking to expanded sections** | Resume page is a single scroll page. Hash linking to toggle a collapsible is over-engineering | Omit. Users scroll or use browser find |

## Feature Dependencies

```
Accessible keyboard interaction → ARIA attributes (ARIA builds on the same DOM structure)
Collapsed preview with fade → Smooth height animation (animation needs to know the preview height as its collapsed target)
Smooth height animation → Works with v-html content (height measurement depends on rendered DOM from v-html)
Configurable preview height → Collapsed preview with fade (preview height prop feeds into the fade implementation)
Print-friendly → Collapsed preview with fade (print override needs to know what styles to undo)
Transition on first render → Smooth height animation (same height measurement mechanism, just needs to run before first paint)
```

## MVP Recommendation

Prioritize (in build order):

1. **Toggle expand/collapse on click** — core behavior
2. **Start collapsed by default** — stated requirement
3. **Collapsed preview with fade** — stated requirement; makes collapsed state useful
4. **Chevron indicator** — visual affordance, trivial to add with the toggle
5. **Smooth height animation** — stated requirement; build immediately after preview since it shares the height measurement logic
6. **Cursor and hover feedback** — CSS-only, add alongside chevron
7. **Accessible keyboard interaction** — near-zero cost on top of the click handler
8. **ARIA attributes** — near-zero cost on top of keyboard support

Include as low-effort polish:

9. **Configurable preview height** — prop with default; costs one line
10. **Reduced motion support** — one CSS media query
11. **Print-friendly** — one CSS media query; high value for a resume site

Defer:

- **Persist expanded state**: Unnecessary for a site with one page using the component
- **"Show more" / "Show less" label**: Nice but the chevron + cursor change should suffice for this context. Can be added later via a prop if needed
- **Transition on first render**: Only matters if FOUC is actually observed; may not be an issue with VitePress hydration timing

## Implementation Notes

**Height animation approach:** Use `ref` to get a reference to the content wrapper element. On toggle, read `el.scrollHeight` to get the full content height. Set `style.height` to `scrollHeight + 'px'` (expanded) or `previewHeight` (collapsed). CSS `transition: height 0.3s ease` handles the animation. After the expand transition ends, set `height: auto` so the content can reflow if the viewport resizes. This is the standard pattern — no libraries needed.

**Fade overlay approach:** Use a CSS pseudo-element (`::after`) with a `linear-gradient(transparent, var(--vp-c-bg))` positioned at the bottom of the collapsed preview. Toggle its visibility/opacity when expanded. This automatically matches VitePress light/dark themes via the CSS variable.

**Component structure:** Build as a new `CollapsibleContent.vue` component in `.vitepress/components/`. Register it globally in `.vitepress/theme/index.ts` like the existing components. Use it in `resume.md` to wrap the Profile and Skills sections.

## Sources

- Codebase analysis: `.vitepress/components/ResumeItem.vue`, `.vitepress/components/ResumeSection.vue`, `resume.md`, `.vitepress/theme/index.ts`
- Vue 3 reactivity model and `<script setup>` patterns — established in the existing codebase (HIGH confidence)
- CSS `transition` on `height` with `scrollHeight` measurement — well-documented standard technique (HIGH confidence)
- WAI-ARIA Authoring Practices for disclosure widgets — W3C specification (HIGH confidence)
- `prefers-reduced-motion` — CSS Level 5 Media Queries specification (HIGH confidence)
- `@media print` behavior — CSS 2.1 specification, universally supported (HIGH confidence)

---

*Feature landscape analysis: 2026-02-16*
