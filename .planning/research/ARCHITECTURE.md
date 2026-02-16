# Architecture Patterns

**Domain:** Collapsible Vue component for VitePress resume site
**Researched:** 2026-02-16
**Overall confidence:** HIGH

## Recommended Architecture

CollapsibleResumeItem is a **standalone sibling component** to ResumeItem — not a wrapper, not a prop flag, not a subclass. It lives in `.vitepress/components/`, is globally registered in the theme, and is consumed directly in `resume.md` Markdown. It owns all collapsible behavior (state, animation, preview/fade) internally and accepts the same `description` prop pattern as ResumeItem.

```
resume.md
├── <CollapsibleResumeItem title="Profile" :description="profile"/>   ← new
├── <CollapsibleResumeItem title="Skills" :description="skills"/>     ← new
├── <ResumeSection :items="experience"/>                               ← unchanged
└── <ResumeSection :items="education"/>                                ← unchanged
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **CollapsibleResumeItem** | Renders a collapsible card: clickable header with title + chevron, preview line with fade when collapsed, animated reveal of full HTML content when expanded. Owns all expand/collapse state and animation logic. | `resume.md` (receives `title` and `description` props) |
| **ResumeItem** | Renders a static card with title, subtitle, date, location, description. Unchanged. | `ResumeSection` (receives props), `resume.md` (receives props directly for Profile/Skills — will be replaced by CollapsibleResumeItem) |
| **ResumeSection** | Iterates `Resume[]` array, renders ResumeItem for each. Unchanged. | `resume.md` (receives `items` prop), `ResumeItem` (renders each) |
| **Theme index.ts** | Globally registers all components. Gains one new `app.component()` call. | All components, `resume.md` |

### Data Flow

```
resume.md (defines `profile`, `skills` as HTML strings in <script setup>)
    │
    ├──→ CollapsibleResumeItem (props: title: string, description: string)
    │       │
    │       ├── Internal state: `expanded` ref (boolean, default false)
    │       ├── Template: header row (title + chevron) → click toggles `expanded`
    │       ├── Template: content wrapper → v-html="description"
    │       └── CSS: handles collapse animation, preview fade, chevron rotation
    │
    ├──→ ResumeSection (props: items: Resume[])
    │       └──→ ResumeItem (props spread from each Resume object)
    │
    └── No upward data flow. No events emitted. No shared state.
```

**Data flow is strictly one-way: parent → child via props.** CollapsibleResumeItem manages its own `expanded` boolean internally. No events bubble up. No state is shared between components.

## Key Design Decisions

### Decision 1: Standalone Component (not a wrapper around ResumeItem)

**What:** CollapsibleResumeItem is a fully independent `.vue` file that does not import or compose ResumeItem.

**Why:**
- ResumeItem's `.box` class, `.box-header` layout, and content structure don't map to the collapsible use case. ResumeItem has a two-column header (title+subtitle | date+location) designed for job entries. CollapsibleResumeItem needs a single-row header (title + chevron).
- The Profile and Skills sections currently use ResumeItem with _only_ the `description` prop — they don't use `title`, `subtitle`, `start`, `end`, or `location`. There's no ResumeItem structure to reuse.
- Wrapping ResumeItem would mean fighting its header layout, hiding unused DOM, and overriding scoped styles — more complex than writing a clean component.
- The `.box` visual styling (border, border-radius, padding, box-shadow) is trivially duplicated as CSS. The styling is ~7 lines. The behavioral complexity (collapse, animate, preview, fade) has no overlap with ResumeItem.

**Tradeoff:** Minor style duplication of `.box` CSS. Acceptable because the styling is simple and the behavioral concerns are completely different.

### Decision 2: CSS max-height Transition for Collapse Animation

**What:** Animate expand/collapse using `max-height` with CSS `transition`, not JavaScript-driven height measurement.

**Why:**
- The content is static HTML (rendered once from a prop). It doesn't change after mount. This means we don't need to re-measure height on every frame or mutation.
- `max-height` transition is the simplest approach that works: set `max-height: 0` when collapsed, `max-height: <large-enough-value>` when expanded, with `overflow: hidden` and `transition: max-height 0.3s ease`.
- No JS `requestAnimationFrame` loops, no `ResizeObserver`, no `ref` measuring of `scrollHeight`.

**The "large enough value" approach:**
- Set expanded `max-height` to a value guaranteed to exceed the content (e.g., `1000px` or `2000px`).
- The transition duration applies to the full `max-height` range, so if content is 200px but `max-height` is 1000px, the visible animation completes in ~60ms (200/1000 of 300ms). This means the collapse feels slightly off.
- **Mitigation:** Use `scrollHeight` measured once at mount via a template ref, stored in a reactive variable, and applied as inline `max-height`. This gives a pixel-perfect transition. Since the content never changes, one measurement is sufficient.

**Recommended approach:** Measure `scrollHeight` once in `onMounted`, store it, use it as the expanded `max-height` value. This avoids the arbitrary large-value problem while staying simple.

```
onMounted:
  contentHeight.value = contentRef.value.scrollHeight

Template:
  :style="{ maxHeight: expanded ? contentHeight + 'px' : collapsedHeight + 'px' }"
```

**VitePress SSR consideration:** `onMounted` only runs client-side, which is correct — `scrollHeight` requires DOM. During SSR, the component renders in its default collapsed state with `max-height: 0` (or the preview height). No hydration mismatch because the initial render matches what the server produced.

### Decision 3: Preview Line with Gradient Fade Overlay

**What:** When collapsed, show ~1.5em of content with a CSS gradient overlay that fades to the background color.

**How:**
- The content wrapper has a fixed `max-height` in collapsed state (e.g., `1.5em` or `~24px` — enough for one line of text at `.9rem` font size).
- A `::after` pseudo-element on the content wrapper provides the fade: `linear-gradient(transparent, var(--vp-c-bg))` positioned at the bottom.
- The pseudo-element is shown when collapsed, hidden when expanded (via opacity or display toggle tied to the `expanded` class).

**Why a pseudo-element, not a separate div:**
- Keeps the template clean — no extra wrapper needed.
- The fade is purely decorative and belongs in CSS.
- Toggling via a class on the parent (`.collapsed::after { opacity: 1 }`) is trivial.

**Background color:** Use VitePress's CSS custom property `--vp-c-bg` so the gradient matches in both light and dark themes. This is the standard VitePress background variable.

### Decision 4: Chevron via CSS Border Triangle or Unicode

**What:** Render the expand/collapse indicator using a pure CSS triangle (border trick) or a Unicode character (`\25B6` / `\25BC`), rotated via `transform: rotate()` with CSS transition.

**Why not an icon library:** Adding an icon library (or even an SVG sprite) for a single chevron is unjustifiable overhead. The existing codebase has zero icon dependencies (the email social link uses an inline SVG in config, not a library).

**Recommended:** CSS border triangle. It's sharp at any size, doesn't depend on font rendering, and rotates cleanly:

```css
.chevron {
  border: solid currentColor;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(-45deg);           /* points right when collapsed */
  transition: transform 0.3s ease;
}
.expanded .chevron {
  transform: rotate(45deg);            /* points down when expanded */
}
```

### Decision 5: `expanded` Class on Root Element for State-Driven Styling

**What:** Bind a `.expanded` class to the component's root `<div>` based on the `expanded` ref. All CSS transitions (chevron rotation, content max-height, fade visibility) are driven by this single class.

**Why:**
- Single source of truth: one boolean ref, one class binding, all CSS responds.
- No scattered `:style` bindings for animation state (except `max-height` which needs the measured pixel value).
- Easy to reason about: "if `.expanded` is on the root, everything is in expanded state."

## Patterns to Follow

### Pattern 1: Vue 3 `<script setup lang="ts">` with Typed Props

**What:** Match existing component conventions exactly.

**When:** Always — this is the only pattern used in the codebase.

**Example:**
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
```

### Pattern 2: Scoped Styles with `:deep()` for v-html Content

**What:** Use `<style scoped>` and `:deep()` to style the HTML content rendered via `v-html`, matching the existing ResumeItem pattern.

**When:** Styling elements inside `v-html` rendered content.

**Example:**
```css
:deep(.content ul) {
  margin-top: .3rem;
  padding-left: 1.2rem;
}
```

### Pattern 3: Global Component Registration

**What:** Register in `.vitepress/theme/index.ts` via `app.component()`, then use directly in Markdown without imports.

**When:** For any component that needs to be referenced in `.md` files.

**Example:**
```ts
// in .vitepress/theme/index.ts
import CollapsibleResumeItem from "../components/CollapsibleResumeItem.vue"
app.component('CollapsibleResumeItem', CollapsibleResumeItem)
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Adding a `collapsible` Prop to ResumeItem

**What:** Making ResumeItem conditionally collapsible via a boolean prop.

**Why bad:** Violates single-responsibility. ResumeItem is used for Experience and Education entries (4+ cards with full header layouts). Adding collapsible behavior + preview + fade + animation logic to it doubles its complexity for a feature only 2 of 6+ usages need. Every change to collapse behavior risks breaking the static cards.

**Instead:** Separate component with clear, distinct responsibility.

### Anti-Pattern 2: JavaScript-Driven Frame-by-Frame Animation

**What:** Using `requestAnimationFrame` loops or Vue's `<Transition>` with JS hooks to manually animate height on every frame.

**Why bad:** Overkill for static content. Adds complexity. CSS transitions on `max-height` with a measured value handle this case perfectly. The content never changes after mount, so there's nothing to re-measure.

**Instead:** CSS `transition` on `max-height` with a `scrollHeight` measurement at mount time.

### Anti-Pattern 3: Using Vue's `<Transition>` Component

**What:** Wrapping the content in `<Transition>` for enter/leave animations.

**Why bad:** `<Transition>` is designed for elements entering/leaving the DOM (v-if). The collapsible content should stay in the DOM (for SEO and accessibility — screen readers can still access it). We want a _size_ animation, not an _existence_ animation. `<Transition>` with height animation requires JS hooks anyway, bringing us back to unnecessary complexity.

**Instead:** Keep the content always in the DOM, animate `max-height` via CSS, use `overflow: hidden` to clip.

## Integration Points

### 1. Component File

- **Create:** `.vitepress/components/CollapsibleResumeItem.vue`
- **Convention:** PascalCase filename, `<script setup lang="ts">`, `<style scoped>`

### 2. Theme Registration

- **Modify:** `.vitepress/theme/index.ts`
- **Add:** Import and `app.component('CollapsibleResumeItem', CollapsibleResumeItem)`
- **After:** Existing ResumeItem and ResumeSection registrations (line 20-21)

### 3. Resume Page

- **Modify:** `resume.md`
- **Replace:** `<ResumeItem :description="profile"/>` with `<CollapsibleResumeItem title="Profile" :description="profile"/>`
- **Replace:** `<ResumeItem :description="skills"/>` with `<CollapsibleResumeItem title="Skills" :description="skills"/>`
- **Unchanged:** `<ResumeSection :items="experience">` and `<ResumeSection :items="education">`

### 4. No Changes Required

- ResumeItem.vue — untouched
- ResumeSection.vue — untouched
- custom.css — no global styles needed
- config.mts — no configuration changes
- package.json — no new dependencies

## Build Order

The dependency chain is linear:

```
Step 1: Create CollapsibleResumeItem.vue
        ↓ (no dependency on other steps, but must exist before registration)
Step 2: Register in theme/index.ts
        ↓ (must be registered before Markdown can reference it)
Step 3: Update resume.md to use CollapsibleResumeItem
        ↓ (must have working component + registration)
Step 4: Test and refine animation timing, preview height, fade
```

**What depends on what:**
- Step 2 depends on Step 1 (can't import a file that doesn't exist)
- Step 3 depends on Step 2 (VitePress resolves components via global registration for Markdown usage)
- Step 4 depends on Step 3 (need the full integration to observe behavior)
- Steps 1-3 can be done in a single phase since they're small and tightly coupled
- Step 4 (refinement) is best as a separate verification pass

**Build verification:** Run `npm run docs:dev` after Step 3 to see the component in context. Run `npm run docs:build` to verify SSR compatibility (no `window`/`document` access outside `onMounted`).

## SSR Compatibility Notes

VitePress pre-renders pages as static HTML (SSR). Key constraints:

- **`onMounted` is client-only:** Safe for DOM measurement (`scrollHeight`). Will not run during SSR build.
- **`ref` initial values are used during SSR:** `expanded = ref(false)` means the server-rendered HTML shows the collapsed state. This is correct — the component should start collapsed.
- **No `document` or `window` in `<script setup>` top-level:** Only access browser APIs inside `onMounted` or event handlers.
- **`max-height` initial value:** During SSR, the content wrapper will render with `max-height` set to the collapsed preview height (e.g., `1.5em`). After hydration, `onMounted` measures `scrollHeight` for the expanded value. No flash because the initial state is collapsed.

## Sources

- Existing codebase analysis: `.vitepress/components/ResumeItem.vue`, `.vitepress/components/ResumeSection.vue`, `.vitepress/theme/index.ts`, `resume.md` — HIGH confidence (direct source code inspection)
- VitePress component integration patterns: `.vitepress/theme/index.ts` global registration, Markdown component usage — HIGH confidence (observed working pattern in codebase)
- CSS `max-height` transition technique: well-established CSS pattern, no library dependency — HIGH confidence
- VitePress SSR behavior (`onMounted` client-only): standard Vue 3 SSR lifecycle — HIGH confidence
- `--vp-c-bg` CSS custom property: standard VitePress theme variable for background color — HIGH confidence

---

*Architecture research: 2026-02-16*
