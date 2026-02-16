# Domain Pitfalls

**Domain:** Vue 3 collapsible/accordion component in VitePress SSG
**Researched:** 2026-02-16
**Overall confidence:** HIGH (verified against official Vue 3 and VitePress documentation)

---

## Critical Pitfalls

Mistakes that cause build failures, hydration errors, or broken production output.

### Pitfall 1: CSS `height` Transition from `auto` — the Fundamental CSS Limitation

**What goes wrong:** CSS cannot transition `height: 0` to `height: auto`. Setting `transition: height 0.3s` with a target of `auto` produces no animation — the content snaps open/closed instantly.

**Why it happens:** The CSS transition specification requires numeric start and end values. `auto` is a keyword, not a number, so the browser cannot interpolate between `0px` and `auto`.

**Consequences:** The collapsible appears to work (content shows/hides) but with zero animation, defeating the purpose. Developers often spend hours debugging CSS thinking the transition property is wrong.

**Warning signs:**
- Content appears/disappears without smooth animation
- The `transition` CSS property is correctly defined but has no visible effect
- Works fine when you hardcode a pixel height but breaks with `auto`

**Prevention:** Use one of these proven patterns (in order of recommendation):
1. **`max-height` approach:** Transition `max-height` from `0` to a value larger than any possible content height (e.g., `2000px`). Simple but the easing curve will feel off if the estimate is far from actual height. Good enough for this use case since resume item content is bounded.
2. **JavaScript `scrollHeight` approach:** On toggle, read `el.scrollHeight` to get the actual content height, set it as an explicit pixel value, let CSS transition to that value, then switch to `auto` after `transitionend`. More precise animation but requires JS lifecycle management.
3. **`overflow: hidden` is mandatory** with both approaches — without it, content bleeds out during the collapsed state.

**Phase:** Implementation phase — decide the animation strategy before writing CSS.

**Confidence:** HIGH — this is a well-documented CSS limitation, confirmed by MDN and every major CSS reference.

---

### Pitfall 2: VitePress SSR Hydration Mismatch on Interactive State

**What goes wrong:** If the component renders different HTML on the server vs. the client (e.g., collapsed state depends on `window` size, or uses `Math.random()`, or conditionally renders based on browser-only APIs), VitePress build succeeds but the browser console shows hydration mismatch warnings and the DOM may flicker or break on page load.

**Why it happens:** VitePress pre-renders every page as static HTML during `vitepress build` using Node.js SSR. The server render runs in Node.js where there is no `window`, `document`, or DOM APIs. When the client hydrates, Vue compares the server-rendered DOM against what the client would render. Any difference triggers a hydration mismatch.

**Consequences:** Console warnings in development; in production, Vue discards the mismatched server-rendered DOM and re-renders from scratch, causing visible flash-of-content and losing SSG performance benefits.

**Warning signs:**
- Console warning: `Hydration node mismatch` or `Hydration text content mismatch`
- Content flickers briefly on page load
- Component works in `docs:dev` but behaves differently after `docs:build && docs:preview`

**Prevention:**
- Ensure the **initial render** (collapsed state) is deterministic and produces identical HTML on server and client. Use a hardcoded initial state (e.g., `const isExpanded = ref(false)`) — never derive initial state from browser APIs.
- **All DOM access** (`scrollHeight`, `getBoundingClientRect`, `window.*`) must be inside `onMounted` or event handlers — never in `<script setup>` top-level scope or computed properties.
- Run `npm run docs:build && npm run docs:preview` as a verification step, not just `docs:dev` (dev mode does not perform SSR).

**Phase:** Implementation phase — must be correct from the first implementation. Retrofit is painful because it requires restructuring component initialization logic.

**Confidence:** HIGH — verified against VitePress SSR Compatibility docs (https://vitepress.dev/guide/ssr-compat) and Vue SSR docs (https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch).

---

### Pitfall 3: `v-html` Content Invisible to Vue Scoped Styles

**What goes wrong:** The existing `ResumeItem.vue` uses `v-html` to render description HTML. With `<style scoped>`, Vue adds unique `data-v-xxxxx` attributes to elements it compiles. But `v-html` content is injected raw at runtime — Vue's compiler never sees it, so those elements lack the scoped attribute. Any new scoped CSS targeting elements inside the `v-html` output (e.g., styling the "preview line" or truncation) simply won't apply.

**Why it happens:** Vue's scoped style system works at compile time by adding attribute selectors. `v-html` bypasses the template compiler entirely.

**Consequences:** Styles appear to work for template-defined elements but silently fail for `v-html` content. Developers add CSS rules that have no effect and struggle to understand why.

**Warning signs:**
- CSS rules target elements inside `.description` but have no visual effect
- DevTools shows the elements exist but lack `data-v-xxxxx` attributes
- Adding `!important` doesn't fix it (the attribute selector itself doesn't match)

**Prevention:**
- The existing codebase already handles this correctly using `:deep()` selectors (see `ResumeItem.vue:96-108`). **Continue this pattern** for any new styles targeting `v-html` content.
- For the collapsed preview (1-line truncation), the truncation CSS (`overflow: hidden`, `max-height`, `line-clamp`) must use `:deep()` or be applied to a wrapper element that IS in the template (not inside `v-html`).
- Alternative: Apply truncation to the `.description` wrapper div itself (which IS scoped) rather than trying to style children inside `v-html`.

**Phase:** Implementation phase — when writing the CSS for collapsed state truncation.

**Confidence:** HIGH — verified against existing codebase pattern and Vue documentation. The project already uses `:deep()` for this exact reason.

---

## Moderate Pitfalls

### Pitfall 4: `overflow: hidden` Clipping the Box Shadow and Border Radius

**What goes wrong:** The collapsible content wrapper needs `overflow: hidden` for the height animation. If applied to the `.box` element (which has `box-shadow` and `border-radius`), the `overflow: hidden` can clip the box shadow or cause visual artifacts at the border radius corners during animation.

**Warning signs:**
- Box shadow disappears or gets cut off during/after collapse animation
- Border radius looks wrong when content overflows during transition

**Prevention:** Apply `overflow: hidden` to an inner content wrapper, not to the outer `.box` container that has the decorative styles. Structure:
```html
<div class="box">              <!-- keeps box-shadow, border-radius -->
  <div class="box-header">...</div>
  <div class="content-wrapper"> <!-- overflow: hidden + height transition HERE -->
    <div v-html="description"></div>
  </div>
</div>
```

**Phase:** Implementation phase — template structure decision.

**Confidence:** MEDIUM — common CSS layout issue, well-documented in CSS community.

---

### Pitfall 5: Animating `height` Triggers Layout Thrashing (Performance)

**What goes wrong:** Transitioning `height` or `max-height` triggers CSS layout recalculation on every animation frame. With multiple collapsible items on the resume page (4+ experience entries, 2 education entries), rapidly toggling multiple items could cause visible jank on lower-powered devices.

**Why it happens:** `height` is not a compositor-only property (unlike `transform` and `opacity`). Changing it forces the browser to recalculate layout for the element and all siblings below it. Vue's official transition docs explicitly warn: "properties like `height` or `margin` will trigger CSS layout, so they are much more expensive to animate, and should be used with caution."

**Warning signs:**
- Animation stutters or drops frames, especially on mobile
- Chrome DevTools Performance panel shows long "Layout" blocks during toggle

**Prevention:**
- Accept the tradeoff: for this use case (a personal resume site with ~6 collapsible items, toggled one at a time by occasional visitors), height animation performance is acceptable. This is NOT a scrolling list of 100 accordions.
- Keep transition duration short (200-300ms) to minimize the window of layout recalculation.
- Avoid animating `margin` or `padding` simultaneously — only animate `height` or `max-height`.
- If performance becomes an issue, switch to a `transform: scaleY()` + `transform-origin: top` approach (GPU-accelerated) but this distorts content during animation, which looks poor for text.

**Phase:** Implementation phase — choose transition property and duration.

**Confidence:** HIGH — verified against Vue Transition docs performance section (https://vuejs.org/guide/built-ins/transition.html#performance-considerations).

---

### Pitfall 6: Chevron Rotation Not Synced with Transition Lifecycle

**What goes wrong:** The chevron icon rotates on toggle, but if the rotation transition has a different duration/easing than the content height transition, the visual effect feels disconnected. Worse, if the user clicks rapidly, the chevron can get stuck in an intermediate rotation state.

**Warning signs:**
- Chevron finishes rotating before content finishes expanding (or vice versa)
- Rapid clicking causes chevron to point in the wrong direction
- Chevron animation uses a different easing curve, creating visual discord

**Prevention:**
- Use the same `transition-duration` and `transition-timing-function` for both the chevron `transform: rotate()` and the content `max-height` / `height` transition.
- Drive the chevron state from the same `isExpanded` ref that controls content — never use a separate state variable.
- CSS `transform: rotate()` is GPU-accelerated, so the chevron rotation will naturally be smoother than the height animation. Match the durations to compensate visually.

**Phase:** Implementation phase — when adding the chevron toggle.

**Confidence:** MEDIUM — based on common UX patterns and CSS transition behavior.

---

### Pitfall 7: `<style scoped>` in Markdown Pages Bloats Page Size

**What goes wrong:** VitePress documentation explicitly warns: "When used in Markdown, `<style scoped>` requires adding special attributes to every element on the current page, which will significantly bloat the page size." If component styles leak into the Markdown page or developers add `<style scoped>` to the `.md` file, page size grows substantially.

**Why it happens:** VitePress compiles each `.md` file as a Vue SFC. `<style scoped>` adds `data-v-xxxxx` attributes to every element on that page, including all the rendered Markdown content (paragraphs, headings, lists, etc.).

**Prevention:**
- Keep `<style scoped>` in `.vue` component files only (where it scopes correctly to the component's template). This is the existing pattern (`ResumeItem.vue` already uses `<style scoped>`).
- Never add `<style scoped>` to `resume.md` or other `.md` files.
- For page-level styles, use `<style module>` or put styles in `.vitepress/theme/styles/custom.css`.

**Phase:** Implementation phase — when deciding where to put new CSS.

**Confidence:** HIGH — directly from VitePress official docs (https://vitepress.dev/guide/using-vue#script-and-style).

---

## Minor Pitfalls

### Pitfall 8: Collapsed Preview Text Truncation on Multi-Element HTML Content

**What goes wrong:** The resume descriptions contain complex HTML (`<blockquote>`, `<ul>`, `<li>`, `<p>`). A simple `text-overflow: ellipsis` or `-webkit-line-clamp` only works on single block elements with inline content. Applied to the `.description` div containing block-level children, it has no visible effect.

**Prevention:**
- Use `max-height` + `overflow: hidden` for the collapsed state rather than text truncation CSS. Set the collapsed `max-height` to approximately 1 line height (e.g., `1.3rem` based on existing `.description` font-size), which visually clips the content.
- Do not attempt `line-clamp` on a container with block children — it will not work as expected.
- Accept that the preview in collapsed state will be a clipped view of the first line of content, not a cleanly ellipsis-truncated line.

**Phase:** Implementation phase — collapsed state visual design.

**Confidence:** HIGH — CSS `line-clamp` specification requires `display: -webkit-box` which conflicts with block children.

---

### Pitfall 9: Breaking the Existing `ResumeSection` Component Contract

**What goes wrong:** `ResumeSection.vue` iterates over items and renders each as a `<ResumeItem>`. If the collapsible behavior is added to `ResumeItem` but `ResumeSection` still passes props identically, the non-collapsible uses (Profile and Skills sections in `resume.md` use `<ResumeItem>` directly without `<ResumeSection>`) may unexpectedly gain collapse behavior.

**Prevention:**
- Make collapsible behavior **opt-in** via a prop (e.g., `:collapsible="true"`) rather than changing default behavior.
- Alternatively, create a new `CollapsibleResumeItem` component that wraps or extends `ResumeItem`, keeping the existing component unchanged.
- Either approach preserves backward compatibility with `<ResumeItem :description="profile"/>` and `<ResumeItem :description="skills"/>` (which should NOT be collapsible).

**Phase:** Design phase — component API decision, before implementation begins.

**Confidence:** HIGH — verified by reading `resume.md` which uses `ResumeItem` in two different contexts.

---

### Pitfall 10: `onMounted` Guard Missing for `scrollHeight` Reads

**What goes wrong:** If the JavaScript `scrollHeight` approach is used for precise height animation, calling `el.scrollHeight` before the component is mounted (or during SSR) throws a runtime error because `$refs` / template refs are `null` until `onMounted`.

**Prevention:**
- All DOM measurement code must be inside `onMounted` or triggered by user events (click handlers).
- Use `nextTick()` after reactive state changes if you need to measure the DOM after a re-render.
- If using the simpler `max-height` CSS approach, this pitfall is entirely avoided (no JS DOM measurement needed).

**Phase:** Implementation phase — if choosing the JS-driven height animation approach.

**Confidence:** HIGH — Vue 3 lifecycle documentation; `onMounted` is the earliest hook where template refs are available.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| **Design: Component API** | Breaking existing `ResumeItem` usage (Pitfall 9) | Decide opt-in collapsible prop vs. new wrapper component |
| **Implementation: CSS Animation** | `height: auto` transition failure (Pitfall 1) | Commit to `max-height` or JS `scrollHeight` approach upfront |
| **Implementation: Template Structure** | `overflow: hidden` clipping box-shadow (Pitfall 4) | Use inner wrapper element for overflow |
| **Implementation: Scoped Styles** | `v-html` content unstyled (Pitfall 3) | Use `:deep()` selectors or style wrapper elements |
| **Implementation: Collapsed State** | `line-clamp` fails on block HTML (Pitfall 8) | Use `max-height` clipping, not text truncation |
| **Implementation: SSR** | Hydration mismatch (Pitfall 2) | Initial state must be deterministic; no DOM access outside `onMounted` |
| **Verification: Build** | SSR issues only surface in build (Pitfall 2) | Always test with `docs:build && docs:preview`, not just `docs:dev` |
| **Polish: Animation Sync** | Chevron and content out of sync (Pitfall 6) | Use identical duration/easing; single state variable |

---

## Sources

- Vue 3 Transition docs: https://vuejs.org/guide/built-ins/transition.html (performance section, CSS transition classes)
- Vue 3 SSR docs: https://vuejs.org/guide/scaling-up/ssr.html (hydration mismatch, lifecycle hooks in SSR)
- Vue 3 Animation Techniques: https://vuejs.org/guide/extras/animation.html (class-based animations, state-driven)
- VitePress SSR Compatibility: https://vitepress.dev/guide/ssr-compat (`<ClientOnly>`, `onMounted` for browser APIs)
- VitePress Using Vue in Markdown: https://vitepress.dev/guide/using-vue (`<style scoped>` warning in Markdown)
- Existing codebase: `.vitepress/components/ResumeItem.vue` (`:deep()` pattern for `v-html`), `resume.md` (two usage contexts for `ResumeItem`)
- CSS specification: `height: auto` cannot be transitioned (MDN, CSS Transitions Level 1 spec)
