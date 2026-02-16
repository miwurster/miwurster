# Phase 1: Collapsible Component - Research

**Researched:** 2026-02-16
**Domain:** Vue 3 collapsible component with preview state, CSS height animation, VitePress SSR
**Confidence:** HIGH

## Summary

This phase builds a standalone `CollapsibleResumeItem` Vue component that toggles between a collapsed preview (showing ~1 line of content with gradient fade-out) and an expanded state showing full HTML content. The component needs a clickable header row with title on the left and a subtle rotating chevron on the right.

The central technical challenge is **animating height with a partial-collapse preview state**. The prior roadmap research recommended `grid-template-rows: 0fr/1fr`, but that technique animates between fully hidden (0) and fully shown (natural height). Our requirement is a **preview state** — approximately one line of visible content in collapsed state — which means we need to animate between a known small height and an unknown full height. This rules out the pure grid approach and points to `max-height` with `scrollHeight` measurement.

The recommended implementation uses `max-height` with CSS `transition`, where collapsed `max-height` is a fixed preview height (e.g., `1.5em`) and expanded `max-height` is the content's `scrollHeight` measured once in `onMounted`. A `::after` pseudo-element provides the gradient fade overlay in collapsed state. The chevron is a CSS border triangle rotated via `transform`. All state-driven styling is controlled by a single `.expanded` class on the root element. The component follows existing codebase conventions exactly: `<script setup lang="ts">`, `<style scoped>`, `defineProps<{...}>()`, `:deep()` for v-html content.

**Primary recommendation:** Use `max-height` transition with `scrollHeight` measurement at mount time. Do NOT use `grid-template-rows: 0fr/1fr` — it doesn't support the partial-collapse preview requirement.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
#### Chevron & visual indicators
- Chevron sits on the **right side** of the header row (header text left, chevron pushed far right)
- Chevron points **right** when collapsed, rotates **down** when expanded
- Chevron is **subtle** — smaller size, muted color, doesn't compete with header text
- **Chevron alone** signals expand/collapse — no extra borders, backgrounds, or decorations on the collapsed state

### Claude's Discretion
- Collapsed preview appearance (how much content shows, fade-out gradient style, preview height)
- Expand/collapse interaction details (click target area, hover states, keyboard/accessibility)
- Animation timing and easing (speed, curve)
- Exact chevron size, color, and rotation transition

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vue 3 | (bundled with VitePress) | Component framework | Already in project, `<script setup lang="ts">` convention |
| CSS Transitions | n/a | Height and transform animation | Native browser feature, zero dependencies |
| VitePress | ^1 | Static site generator | Already in project, provides SSR and component system |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `--vp-c-bg` CSS variable | Gradient fade background color | Fade overlay must match page background in both light/dark themes |
| `:deep()` selector | Style v-html content through scoped styles | When any CSS needs to target elements inside `v-html` output |
| `onMounted` lifecycle hook | DOM measurement (`scrollHeight`) | Measuring full content height for animation target |

### Alternatives Considered

| Instead of | Could Use | Why Not |
|------------|-----------|---------|
| `max-height` + `scrollHeight` | `grid-template-rows: 0fr/1fr` | Grid trick animates 0 → full height. Does NOT support partial collapse (preview ~1 line visible). Would require placing preview content outside the grid wrapper, duplicating content. |
| `max-height` + `scrollHeight` | `max-height: 9999px` (arbitrary large value) | Easing curve is proportional to the full `max-height` range, not actual content. Collapse animation has visible delay (must traverse 9999px → 0 even when content is 200px). |
| CSS border triangle | Icon library (heroicons, lucide) | Single icon doesn't justify a dependency. Codebase has zero icon libraries. CSS triangle is sharp, scalable, and rotates cleanly. |
| CSS border triangle | Unicode chevron character (`\25B6`) | Font rendering varies across OS/browsers. CSS border triangle is pixel-consistent. |
| `::after` pseudo-element fade | Separate `<div>` overlay | Pseudo-element keeps template clean. Fade is purely decorative, belongs in CSS. |

### Installation

```bash
# No new dependencies required
# Pure CSS + Vue 3 Composition API (already in project)
```

## Architecture Patterns

### Component Structure

```
.vitepress/components/
├── CollapsibleResumeItem.vue   # NEW — this phase
├── ResumeItem.vue              # UNCHANGED
└── ResumeSection.vue           # UNCHANGED
```

### Pattern 1: `max-height` Transition with `scrollHeight` Measurement

**What:** Animate content height by transitioning `max-height` between a fixed collapsed value and a measured expanded value.

**When to use:** When animating between a partial-collapse state (preview) and full content, where the full height is unknown and determined by dynamic HTML content.

**Why not grid `0fr/1fr`:** The grid technique transitions from fully hidden (0 height) to natural height. It cannot hold a preview state where ~1 line remains visible. To show a preview with the grid approach, you'd need to place preview content outside the grid wrapper and duplicate/sync it with the full content — unnecessary complexity.

**Example:**
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const expanded = ref(false)
const contentRef = ref<HTMLElement | null>(null)
const contentHeight = ref(0)

function toggle() {
  expanded.value = !expanded.value
}

onMounted(() => {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight
  }
})
</script>

<template>
  <div :class="['box', { expanded }]">
    <div class="header" @click="toggle">
      <span class="title">{{ title }}</span>
      <span class="chevron" />
    </div>
    <div
      ref="contentRef"
      class="content-wrapper"
      :style="{ maxHeight: expanded ? contentHeight + 'px' : undefined }"
    >
      <div class="content" v-html="description"></div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  max-height: 1.5em;     /* collapsed preview height */
  overflow: hidden;
  transition: max-height 0.3s ease;
  position: relative;
}

.expanded .content-wrapper {
  /* max-height set via inline style from scrollHeight */
}
</style>
```

**Confidence:** HIGH — `max-height` CSS transition is universally supported, `scrollHeight` is a standard DOM property, and the content is static (measured once, never changes).

### Pattern 2: Gradient Fade Overlay via `::after` Pseudo-Element

**What:** A CSS pseudo-element overlays the bottom of the collapsed preview with a gradient from transparent to the page background color, creating a "fade out" effect.

**When to use:** Collapsed state only. Hidden when expanded.

**Example:**
```css
.content-wrapper {
  position: relative;
}

.content-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.5em;
  background: linear-gradient(transparent, var(--vp-c-bg));
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.expanded .content-wrapper::after {
  opacity: 0;
}
```

**Confidence:** HIGH — `--vp-c-bg` is VitePress's standard background CSS variable, works in both light and dark themes. Pseudo-element pattern is well-established.

### Pattern 3: CSS Border Triangle Chevron

**What:** A pure CSS chevron using the border trick, rotated via `transform`.

**When to use:** Visual indicator for expand/collapse state.

**Locked decision:** Right side of header, points right when collapsed, rotates down when expanded, subtle/muted appearance.

**Example:**
```css
.chevron {
  border: solid var(--vp-c-text-3);   /* muted VitePress text color */
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);           /* points right */
  transition: transform 0.3s ease;
}

.expanded .chevron {
  transform: rotate(45deg);            /* points down */
}
```

**Confidence:** HIGH — CSS border triangle is a well-established technique. `--vp-c-text-3` is VitePress's tertiary (muted) text color variable.

### Pattern 4: Header Layout with Flexbox

**What:** Header row uses flexbox to push title left and chevron right.

**Example:**
```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
```

**Confidence:** HIGH — standard flexbox pattern, matches existing `.box-header` in ResumeItem.vue.

### Anti-Patterns to Avoid

- **Using `grid-template-rows: 0fr/1fr` for this component:** Does not support partial collapse (preview state). Only works for fully hidden → fully shown transitions.
- **Using Vue `<Transition>` component:** Designed for enter/leave animations (v-if/v-show). Content should stay in the DOM always (for SEO, accessibility). Height animation via `<Transition>` requires JS hooks with the same `scrollHeight` measurement anyway.
- **Transitioning `height: auto`:** CSS cannot interpolate to/from `auto`. Results in instant snap with no animation.
- **Using `max-height: 9999px` (arbitrary large value):** Easing curve is calculated over the full range (9999px). Actual content is ~200-400px. Visual result: expand feels okay but collapse has a noticeable delay before content starts shrinking.
- **Adding `overflow: hidden` to the `.box` element:** Clips box-shadow and border-radius. Apply `overflow: hidden` to an inner content wrapper only.
- **Using a separate state variable for chevron:** Chevron rotation and content expansion must be driven by the same `expanded` ref to stay in sync.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Height animation | JavaScript frame-by-frame animation loop | CSS `transition` on `max-height` | CSS transitions are GPU-optimized, declarative, and don't require manual cleanup |
| Chevron icon | Import an icon library | CSS border triangle | One chevron doesn't justify a dependency; border trick is 5 lines of CSS |
| Theme-aware colors | Hardcoded color values | VitePress CSS variables (`--vp-c-bg`, `--vp-c-text-3`) | Automatic light/dark theme support |
| Keyboard interaction | Custom keydown handler | `<button>` element | Buttons natively handle Enter and Space, get focus ring, and are announced correctly by screen readers |

**Key insight:** This component's complexity is in CSS (animation, fade, layout), not JavaScript. The JS is minimal: one ref, one toggle function, one `onMounted` measurement. Don't over-engineer the JS side.

## Common Pitfalls

### Pitfall 1: `scrollHeight` Not Available During SSR

**What goes wrong:** Accessing `scrollHeight` in `<script setup>` top-level or a computed property causes a build error because VitePress SSR runs in Node.js where DOM APIs don't exist.

**Why it happens:** `scrollHeight` is a browser DOM property. During `vitepress build`, components render in Node.js SSR where there is no DOM.

**How to avoid:** All `scrollHeight` access must be inside `onMounted()` which only runs client-side. The initial collapsed state uses a fixed CSS `max-height` (e.g., `1.5em`) which requires no measurement.

**Warning signs:** Build error mentioning `scrollHeight`, `HTMLElement`, or `undefined` during `npm run docs:build`.

### Pitfall 2: Hydration Mismatch from Dynamic Initial State

**What goes wrong:** If the component's initial render differs between server (SSR) and client (hydration), Vue logs hydration mismatch warnings and may re-render from scratch, causing a flash.

**How to avoid:** Initial state must be deterministic. `expanded = ref(false)` ensures both SSR and client render the same collapsed HTML. The inline `style` binding for `max-height` must not include the measured `scrollHeight` value in the initial render — it should only be set after `onMounted` when the user first expands.

**Concrete approach:**
- Collapsed state: `max-height` is set purely via CSS class (e.g., `1.5em`). No inline style needed.
- Expanded state: Inline style `maxHeight: contentHeight + 'px'` is applied only after `onMounted` has run and `expanded` toggles to `true`. During SSR, `expanded` is `false`, so the inline style binding isn't evaluated.

**Warning signs:** Content flickers on page load. Console warning about hydration mismatch.

### Pitfall 3: v-html Content Not Styled by Scoped CSS

**What goes wrong:** CSS rules targeting elements inside `v-html` content have no effect because Vue's scoped style system adds `data-v-xxxxx` attributes at compile time but `v-html` content bypasses the compiler.

**How to avoid:** Use `:deep()` selectors for any rules targeting `v-html` children. Alternatively, apply truncation/overflow styles to the wrapper element itself (which IS in the template and gets scoped attributes).

**Recommendation for this component:** Apply `max-height` and `overflow: hidden` to the `.content-wrapper` div (template element, scoped styles work). Only use `:deep()` if styling specific elements inside the `v-html` output (e.g., `ul` margin, `li` spacing). Copy the existing `:deep()` patterns from `ResumeItem.vue`.

### Pitfall 4: `overflow: hidden` Clips Box Shadow

**What goes wrong:** If `overflow: hidden` is applied to the outer `.box` element (which has `box-shadow` and `border-radius`), the shadow gets clipped.

**How to avoid:** Use a two-layer structure:
```html
<div class="box">              <!-- box-shadow, border-radius, padding -->
  <div class="header">...</div>
  <div class="content-wrapper"> <!-- overflow: hidden, max-height, transition -->
    <div v-html="description"></div>
  </div>
</div>
```

### Pitfall 5: Collapse Animation Feels "Delayed" with `max-height`

**What goes wrong:** When collapsing, the CSS transition goes from `scrollHeight` (e.g., 300px) to the preview height (e.g., 24px). If the easing is `ease` (slow start, slow end), the first part of the animation covers the invisible overflow area, making the visible content appear to wait before starting to collapse.

**How to avoid:** Use `ease-in-out` or `ease` with a slightly shorter duration (250ms instead of 300ms). The effect is subtle for content heights under ~500px. If noticeable, consider using different timing for expand vs. collapse:
```css
.content-wrapper {
  transition: max-height 0.3s ease;  /* expand */
}
.content-wrapper:not(.expanded) {
  transition: max-height 0.25s ease-in;  /* collapse — slightly faster */
}
```

**Practically:** For this component (Profile is ~3 paragraphs, Skills is ~6 bullet points), the content height is moderate (~200-400px). The `max-height` approach works well at these sizes. The easing difference is barely perceptible.

### Pitfall 6: Chevron and Content Animation Out of Sync

**What goes wrong:** Chevron rotation and content height transition have different durations or easing curves, creating visual discord.

**How to avoid:** Use the same `transition-duration` and `transition-timing-function` for both. Both are driven by the single `.expanded` class toggle.

## Code Examples

Verified patterns for this specific component:

### Complete Component Skeleton

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  title: string
  description: string
}>()

const expanded = ref(false)
const contentRef = ref<HTMLElement | null>(null)
const contentHeight = ref(0)

function toggle() {
  expanded.value = !expanded.value
}

onMounted(() => {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight
  }
})
</script>

<template>
  <div :class="['box', { expanded }]">
    <button class="header" @click="toggle" :aria-expanded="expanded">
      <span class="title">{{ title }}</span>
      <span class="chevron" aria-hidden="true" />
    </button>
    <div
      ref="contentRef"
      class="content-wrapper"
      :style="expanded ? { maxHeight: contentHeight + 'px' } : undefined"
    >
      <div class="content" v-html="description"></div>
    </div>
  </div>
</template>

<style scoped>
.box {
  border: 1px solid #e1e9ee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;
  text-align: left;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
}

.chevron {
  border: solid var(--vp-c-text-3);
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 12px;
}

.expanded .chevron {
  transform: rotate(45deg);
}

.content-wrapper {
  max-height: 1.5em;
  overflow: hidden;
  position: relative;
  transition: max-height 0.3s ease;
}

.content-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.5em;
  background: linear-gradient(transparent, var(--vp-c-bg));
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.expanded .content-wrapper::after {
  opacity: 0;
}

.content {
  font-size: .9rem;
  font-weight: 400;
  margin: 0;
}

:deep(.content ul) {
  margin-top: .3rem;
  padding-left: 1.2rem;
  margin-bottom: .3rem;
}

:deep(.content li) {
  margin-top: 0.2rem;
}

:deep(.content a) {
  font-weight: 400;
}
</style>
```

**Source:** Synthesized from existing `ResumeItem.vue` patterns, CSS transition specification, VitePress theme variables, and WAI-ARIA Disclosure pattern.

### Header as `<button>` for Accessibility

```html
<button class="header" @click="toggle" :aria-expanded="expanded">
```

Using a native `<button>` element instead of a `<div>` with `@click`:
- Natively focusable (no `tabindex` needed)
- Natively handles Enter and Space key activation
- Announced as "button" by screen readers
- Gets focus ring from browser defaults
- Requires resetting default button styles (`background: none; border: none; font: inherit; color: inherit`)

**Source:** WAI-ARIA Authoring Practices — Disclosure Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

### VitePress CSS Variables for Theme Compatibility

```css
/* Background color — matches page background in light and dark themes */
var(--vp-c-bg)

/* Muted text color — for subtle UI elements like chevrons */
var(--vp-c-text-3)

/* Border color — matches VitePress component borders */
var(--vp-c-divider)
```

**Source:** VitePress default theme CSS variables, verified in existing codebase (ResumeItem.vue uses `#e1e9ee` for borders — could be replaced with `var(--vp-c-divider)` for full dark mode support, but this is consistent with existing code).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `max-height: 9999px` hack | `grid-template-rows: 0fr/1fr` for 0→full, `max-height` + `scrollHeight` for partial→full | ~2020 (grid animation support) | Grid is cleaner for full hide/show; `max-height` + measurement still best for preview states |
| Vue `<Transition>` with JS height hooks | CSS-only transitions with class toggle | Always available, but community converged ~2022 | Simpler code, no lifecycle hook timing issues |
| Icon library for single chevron | CSS border triangle or inline SVG | Always available | Zero dependency for trivial shapes |
| `interpolate-size: allow-keywords` | NOT production ready | Chromium 129+ only (2024), no Firefox/Safari | Cannot use yet; monitor for ~2027 |

## Discretionary Recommendations

These address the areas marked as "Claude's Discretion" in CONTEXT.md:

### Collapsed Preview Appearance

**Recommendation:** `max-height: 1.5em` for collapsed preview height.
- At `.9rem` font-size with `1.3rem` line-height (existing `.description` styles), `1.5em` shows approximately one line of text with slight vertical breathing room.
- The gradient fade overlay (`::after` pseudo-element) should be the full preview height (`1.5em`) to create a smooth fade-to-background effect.
- This works for both paragraph text (Profile) and bullet lists (Skills) — both render their first visible content within this height.

### Click Target Area

**Recommendation:** The entire header row (title + chevron) is the click target.
- Use a `<button>` element wrapping the full header row for native keyboard/accessibility support.
- The click target should NOT include the content preview area — only the header. Clicking the preview text could conflict with text selection or future link interactions in v-html content.

### Hover State

**Recommendation:** Subtle opacity change on the chevron.
```css
.header:hover .chevron {
  border-color: var(--vp-c-text-2);  /* slightly more prominent on hover */
}
```
No background color change or border on hover — per the locked decision ("chevron alone signals expand/collapse — no extra borders, backgrounds, or decorations").

### Animation Timing

**Recommendation:** `0.3s ease` for both content and chevron transitions.
- 0.3s is the sweet spot: fast enough to feel responsive, slow enough to be perceived as smooth.
- `ease` (CSS default easing) provides a natural feel — accelerates in, decelerates out.
- Same duration and easing for chevron rotation and content height ensures visual synchronization.

### Chevron Size and Color

**Recommendation:**
- Size: `3px` padding with `1.5px` border-width. This creates an ~8px visible chevron — small enough to be subtle, large enough to be recognizable.
- Color: `var(--vp-c-text-3)` — VitePress's tertiary text color (muted gray). Visually recedes compared to header text (`var(--vp-c-text-1)`).
- Rotation: `-45deg` (points right) → `45deg` (points down).

### Keyboard/Accessibility

**Recommendation:** Use `<button>` element for the header trigger.
- Provides free keyboard support (Enter/Space), focus management, and screen reader semantics.
- Add `aria-expanded="true/false"` to reflect state.
- Add `aria-hidden="true"` to the chevron span (decorative, not meaningful to screen readers).
- No need for `aria-controls` or content `id` in v1 (optional enhancement).

## Open Questions

1. **Preview height value tuning**
   - What we know: `1.5em` should show ~1 line based on font-size/line-height calculations
   - What's unclear: Whether Profile (paragraph text starting with `<p class="justified">`) and Skills (starting with `<ul>`) both look good at the same preview height
   - Recommendation: Start with `1.5em`, adjust during implementation by visual inspection with `docs:dev`

2. **Content height after viewport resize**
   - What we know: `scrollHeight` is measured once in `onMounted`. If the viewport width changes significantly, text reflow changes the content height.
   - What's unclear: Whether a stale `scrollHeight` causes visible clipping in expanded state
   - Recommendation: For v1, accept the limitation — this is a resume page, not a dynamic app. If observed, re-measure on `resize` event (low priority).

3. **Margin/padding on first v-html child affecting preview**
   - What we know: Profile starts with `<p class="justified">` (which has `margin: 0 !important` via custom.css). Skills starts with `<ul>` which has default browser margin.
   - What's unclear: Whether the `<ul>` top margin pushes visible content below the `1.5em` preview height, showing a blank collapsed state
   - Recommendation: Add `:deep(.content > :first-child) { margin-top: 0; }` to normalize first-child margins in v-html content.

## Sources

### Primary (HIGH confidence)
- Existing codebase: `ResumeItem.vue`, `ResumeSection.vue`, `theme/index.ts`, `resume.md`, `custom.css` — direct source code inspection
- MDN: `grid-template-rows` — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-rows — confirmed `fr` is animatable; confirmed grid trick animates 0→full, not partial
- MDN: CSS Transitions — https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using — confirmed `max-height` is transitionable
- WAI-ARIA Disclosure Pattern — https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ — button role, `aria-expanded`, keyboard interaction
- VitePress SSR Compatibility — https://vitepress.dev/guide/ssr-compat — `onMounted` is client-only, no browser APIs in top-level setup

### Secondary (MEDIUM confidence)
- CSS `max-height` + `scrollHeight` measurement pattern — widely documented community technique, mechanically sound per CSS transition spec
- `--vp-c-bg` and `--vp-c-text-3` VitePress CSS variables — used throughout VitePress default theme, not explicitly documented as public API but stable

### Tertiary (LOW confidence)
- Preview height of `1.5em` for one-line display — calculated from observed font-size/line-height in existing styles, but visual result depends on v-html content structure. Needs validation during implementation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero new dependencies, all techniques verified against MDN/official docs
- Architecture: HIGH — based on direct codebase analysis, prior roadmap research validated
- Animation technique: HIGH — `max-height` transition is universally supported; `scrollHeight` is standard DOM API
- Preview height: MEDIUM — calculated value, needs visual validation during implementation
- Pitfalls: HIGH — all critical pitfalls verified against Vue 3 and VitePress documentation

**Critical correction from prior research:** The roadmap recommended `grid-template-rows: 0fr/1fr`. This technique does NOT support the partial-collapse preview requirement (showing ~1 line). Use `max-height` with `scrollHeight` measurement instead. The grid technique would be correct if the collapsed state fully hid content, but the requirement specifically calls for a visible preview with fade-out.

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (stable domain, no fast-moving dependencies)
