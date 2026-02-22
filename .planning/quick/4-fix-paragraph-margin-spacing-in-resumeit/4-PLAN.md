---
phase: 4-fix-paragraph-margin-spacing-in-resumeit
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - .vitepress/components/ResumeItem.vue
autonomous: true

must_haves:
  truths:
    - "Paragraphs inside ResumeItem description have no excessive top/bottom margin"
    - "Spacing between paragraphs in experience and education cards feels tight and intentional"
  artifacts:
    - path: ".vitepress/components/ResumeItem.vue"
      provides: "`:deep(.description p)` rule overriding VitePress default paragraph margins"
      contains: ":deep(.description p)"
  key_links:
    - from: ".vitepress/components/ResumeItem.vue"
      to: "slot content rendered as VitePress markdown HTML"
      via: ":deep() CSS penetration"
      pattern: ":deep\\(\\.description p\\)"
---

<objective>
Fix excessive paragraph margin spacing inside ResumeItem components.

Purpose: Slot content is processed by VitePress's markdown pipeline, which applies default `<p>` margins that scoped styles cannot override without `:deep()`. The existing `p, div { margin: 0; }` rule is scoped and does not affect slot content.
Output: `.vitepress/components/ResumeItem.vue` with a `:deep(.description p)` rule that eliminates excess top/bottom paragraph margins, consistent with how `blockquote`, `ul`, and `li` are already handled.
</objective>

<execution_context>
@/Users/michael.wurster/.config/opencode/get-shit-done/workflows/execute-plan.md
@/Users/michael.wurster/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.vitepress/components/ResumeItem.vue
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add :deep paragraph margin reset to ResumeItem</name>
  <files>.vitepress/components/ResumeItem.vue</files>
  <action>
    In the `<style scoped>` block of `ResumeItem.vue`, add a `:deep(.description p)` rule after the existing `:deep(.description blockquote p)` rule:

    ```css
    :deep(.description p) {
      margin: 0 0 .5rem 0;
      font-size: .9rem;
      line-height: 1.3rem;
    }
    ```

    The `margin: 0 0 .5rem 0` gives zero top margin and a small bottom margin for visual separation between consecutive paragraphs, matching the tight rhythm already used for lists and blockquotes. `font-size` and `line-height` match the `.description` block values.

    Context: VitePress's default stylesheet applies `margin-top` and `margin-bottom` to `<p>` elements globally. Because slot content is rendered outside the scoped style boundary, the existing `p, div { margin: 0; }` rule has no effect on it. The `:deep()` combinator is the established pattern in this component (already used for `ul`, `li`, `a`, `blockquote`, `blockquote p`).
  </action>
  <verify>Run `npm run dev` and visually inspect the resume page — paragraphs inside ResumeItem cards (Profile section uses CollapsibleResumeItem which shares the same component base; check experience entries that use plain paragraph text) should have no large top gap above them.</verify>
  <done>Paragraphs inside `.description` slots render with no excess top margin and a small, consistent bottom margin (~0.5rem). No visual regression on lists, blockquotes, or other description content.</done>
</task>

</tasks>

<verification>
- Open the resume page in the dev server
- Inspect a `ResumeItem` with paragraph text (e.g. the Profile entry or any experience entry with a plain paragraph before bullet points)
- Confirm paragraph top margin is zero, bottom spacing is tight (~0.5rem)
- Confirm bullet lists, blockquotes, links are visually unchanged
</verification>

<success_criteria>
Paragraph text inside ResumeItem cards has no excessive top/bottom margin. The spacing feels intentional and consistent with the surrounding list and blockquote styles.
</success_criteria>

<output>
After completion, create `.planning/quick/4-fix-paragraph-margin-spacing-in-resumeit/4-SUMMARY.md`
</output>
