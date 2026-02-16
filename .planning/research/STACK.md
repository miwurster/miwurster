# Technology Stack: Collapsible Content Component

**Project:** VitePress Resume Site — Collapsible Component
**Researched:** 2026-02-16
**Overall confidence:** HIGH

## Recommended Technique

### The `grid-template-rows` Trick (Primary Approach)

Use CSS Grid's `grid-template-rows` to animate between `0fr` and `1fr` because `fr` units are interpolatable lengths — unlike `height: auto` which is not transitionable in CSS.

| Aspect | Detail | Confidence |
|--------|--------|------------|
| Technique | `grid-template-rows: 0fr` to `1fr` transition | HIGH |
| Browser support | All modern browsers (Chrome 70+, Firefox 70+, Safari 14+) | HIGH |
| SSR compatible | Yes — pure CSS, no browser APIs | HIGH |
| Performance | Triggers layout but acceptable for single-element toggle | MEDIUM |

**Why this technique:**
- `grid-template-rows` accepts `fr` units which are numeric and therefore CSS-transitionable
- Transitioning `0fr` to `1fr` effectively animates from height 0 to the content's natural height — solving the `height: auto` problem without JavaScript measurement
- The inner element needs `overflow: hidden` and `min-height: 0` to clip content during collapse
- Works across all modern browsers with full support since ~2020
- Zero dependencies, zero JavaScript measurement, pure CSS

**Pattern:**

```css
.collapsible-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.collapsible-wrapper[data-open="true"] {
  grid-template-rows: 1fr;
}

.collapsible-content {
  overflow: hidden;
  min-height: 0;
}
```

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <div>
    <button @click="isOpen = !isOpen">Toggle</button>
    <div class="collapsible-wrapper" :data-open="isOpen">
      <div class="collapsible-content">
        <slot />
      </div>
    </div>
  </div>
</template>
```

### Vue's `<Transition>` Component (NOT Recommended for This)

| Aspect | Detail |
|--------|--------|
| Purpose | Enter/leave animations when elements mount/unmount from DOM via `v-if` or show/hide via `v-show` |
| Uses named CSS classes | `v-enter-from`, `v-enter-active`, `v-enter-to`, `v-leave-from`, `v-leave-active`, `v-leave-to` |
| Dynamic height problem | Same as raw CSS — cannot transition `height: auto` |

**Why NOT to use `<Transition>` here:**
- `<Transition>` is designed for enter/leave animations (elements appearing/disappearing from DOM)
- A collapsible component keeps its content in the DOM — it just toggles height between 0 and auto
- Using `v-if` inside `<Transition>` would destroy and recreate the content on every toggle, which is wasteful and prevents smooth height animation
- Using `v-show` inside `<Transition>` still has the `height: auto` problem
- The `grid-template-rows` approach doesn't need `<Transition>` at all — plain CSS transitions on a data attribute or class toggle are simpler and more performant
- `<Transition>` adds complexity (managing transition classes, timing edge cases) with no benefit for this use case

**When `<Transition>` IS appropriate:**
- Fade-in/fade-out effects for modals, tooltips, route changes
- Animating `opacity`, `transform` — properties with known start/end values
- Enter/leave patterns where content is conditionally rendered with `v-if`

### Vue's `<Transition>` JS Hooks (Alternative Approach — More Complex)

If you need the collapsible to use `v-if` (truly remove from DOM) and want height animation, Vue's JS hooks can work:

```vue
<Transition
  @before-enter="(el) => { el.style.height = '0px'; el.style.overflow = 'hidden' }"
  @enter="(el) => { el.style.height = el.scrollHeight + 'px' }"
  @after-enter="(el) => { el.style.height = 'auto'; el.style.overflow = '' }"
  @before-leave="(el) => { el.style.height = el.scrollHeight + 'px'; el.style.overflow = 'hidden' }"
  @leave="(el) => { el.style.height = '0px' }"
  @after-leave="(el) => { el.style.overflow = '' }"
>
  <div v-if="isOpen">content</div>
</Transition>
```

**Why NOT recommended over grid approach:**
- Requires JavaScript DOM measurement (`scrollHeight`) on every toggle
- More complex to implement and maintain
- `scrollHeight` is a browser API — works in VitePress SSR because hooks only fire client-side, but adds unnecessary complexity
- The grid approach is pure CSS and achieves the same visual result

### CSS `interpolate-size` (Future — NOT Production Ready)

| Aspect | Detail | Confidence |
|--------|--------|------------|
| Spec | CSS Values and Units Module Level 5 | HIGH |
| Purpose | Enables CSS transitions to/from intrinsic size keywords (`auto`, `min-content`, `max-content`, `fit-content`) | HIGH |
| Browser support | Chromium 129+ only (July 2024). **Not in Firefox or Safari** as of Feb 2026 | HIGH |
| Status | **Experimental** — MDN labels "Limited availability" | HIGH |

**What it does:**
```css
:root {
  interpolate-size: allow-keywords; /* opt-in, inherited */
}
.collapsible {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
}
.collapsible.open {
  height: auto; /* now transitionable! */
}
```

**Why NOT to use yet:**
- Firefox and Safari have no support — a resume site must work everywhere
- MDN explicitly marks as "Experimental"
- The CSS WG acknowledges it cannot be enabled by default due to backwards-compatibility issues with existing sites
- `calc-size()` companion function has the same browser limitations
- The `grid-template-rows: 0fr/1fr` technique achieves the same result with universal browser support

**When to adopt:** Monitor [caniuse.com](https://caniuse.com/mdn-css_properties_interpolate-size). Once Firefox and Safari ship support (likely 2026-2027), this becomes the cleanest solution and should replace the grid trick.

## VitePress SSR Considerations

| Concern | Guidance | Source |
|---------|----------|--------|
| Browser API access | Only in `onMounted()` or `beforeMount()` hooks | VitePress docs: SSR Compatibility |
| `<ClientOnly>` wrapper | NOT needed for this component — pure CSS animation uses no browser APIs at import time | VitePress docs |
| `v-html` content | Works fine in SSR — Vue renders it server-side as static HTML | Vue docs |
| `<script setup>` | Fully supported in VitePress custom components | VitePress docs: Using Vue in Markdown |
| `<style scoped>` | Avoid in Markdown pages (bloats output). Fine in `.vue` component files imported into Markdown | VitePress docs |
| `ref()` reactivity | Works client-side after hydration. Initial SSR render should show a sensible default state (collapsed) | Vue SSR docs |
| `import.meta.env.SSR` | Available for conditional browser-only code, but not needed here | VitePress docs |

**Key SSR rule:** The collapsible starts collapsed (default state). The `ref(false)` initial value renders correctly during SSR. The grid wrapper renders with `grid-template-rows: 0fr` which is valid CSS — no hydration mismatch. Toggle interaction only happens client-side after hydration.

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| GSAP / anime.js / Motion One | Overkill for a single collapsible. Adds JS dependency for something achievable in pure CSS. Mentioned in Vue docs for complex animations, not simple toggles |
| `max-height` hack (`max-height: 9999px`) | Classic workaround. Transition duration is proportional to `max-height`, not actual content height — creating either sluggish or jarring animation depending on content size. Also delays closing animation |
| `<details>/<summary>` HTML elements | No smooth animation out of the box. Browser default disclosure triangle styling varies. Can be animated with `interpolate-size` but that's not cross-browser yet |
| JavaScript `el.scrollHeight` measurement + inline style | Works but fragile. Must re-measure on content change. Race conditions with v-html content rendering. The grid approach avoids all measurement |
| `<Transition>` with `v-if` | Destroys DOM content on close. Re-renders on open. No height animation without JS hooks. Adds complexity with no benefit |
| Headless UI / Radix Vue / other UI libraries | Massive dependency for a single component. These are designed for apps, not static sites with one collapsible |

## Performance Notes

Per Vue's official Transition docs — **Performance Considerations** section:
- `transform` and `opacity` are the cheapest properties to animate (GPU-accelerated, no layout trigger)
- `height` and `grid-template-rows` **do trigger CSS layout recalculation** on every animation frame
- For a single collapsible toggle, this is completely acceptable
- For lists of 50+ simultaneously animating collapsibles, consider `transform: scaleY()` or measure once and animate a fixed height
- VitePress is a static documentation site — performance impact of one layout-triggering animation is negligible

## Installation

```bash
# No dependencies required
# Pure CSS + Vue 3 composition API
```

## Sources

- Vue.js official docs: Transition component — https://vuejs.org/guide/built-ins/transition.html (HIGH confidence)
- Vue.js official docs: Animation Techniques — https://vuejs.org/guide/extras/animation.html (HIGH confidence)
- VitePress docs: Using Vue in Markdown — https://vitepress.dev/guide/using-vue (HIGH confidence)
- VitePress docs: SSR Compatibility — https://vitepress.dev/guide/ssr-compat (HIGH confidence)
- MDN: `interpolate-size` — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interpolate-size (HIGH confidence)
- MDN: `calc-size()` — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc-size (HIGH confidence)
- MDN: Using CSS Transitions — https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using (HIGH confidence)
- CSS `grid-template-rows: 0fr/1fr` technique — widely documented community pattern, verified animatable per CSS Grid spec (`fr` is a `<length>` and thus interpolatable) (MEDIUM confidence — community pattern, not single authoritative source, but mechanically sound per spec)
