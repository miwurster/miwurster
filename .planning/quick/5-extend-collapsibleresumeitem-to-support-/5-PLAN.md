---
phase: quick-5
plan: 5
type: execute
wave: 1
depends_on: []
files_modified:
  - .vitepress/components/CollapsibleResumeItem.vue
  - resume.md
autonomous: true

must_haves:
  truths:
    - "CollapsibleResumeItem accepts an optional `justify` boolean prop"
    - "When `justify` is true, the content div has the `.justified` CSS class applied"
    - "Profile section text is rendered with justified alignment"
    - "All other CollapsibleResumeItem usages are unaffected (no justify prop = no class)"
  artifacts:
    - path: ".vitepress/components/CollapsibleResumeItem.vue"
      provides: "Extended component with optional justify prop"
      contains: "justify"
    - path: "resume.md"
      provides: "Profile section using justify prop"
      contains: ":justify"
  key_links:
    - from: "resume.md"
      to: ".vitepress/components/CollapsibleResumeItem.vue"
      via: ":justify='true' prop on Profile CollapsibleResumeItem"
    - from: ".vitepress/components/CollapsibleResumeItem.vue"
      to: ".vitepress/theme/styles/custom.css"
      via: "conditional .justified class on .content div"
---

<objective>
Extend CollapsibleResumeItem with an optional `justify` prop that conditionally applies the global `.justified` CSS class to the content div. Use the prop on the Profile section in resume.md.

Purpose: Profile text is long-form prose that benefits from justified alignment. All other sections (skills, work, education) contain lists and structured data where justification is inappropriate.
Output: Updated component + updated resume.md Profile usage.
</objective>

<execution_context>
@/Users/michael.wurster/.config/opencode/get-shit-done/workflows/execute-plan.md
@/Users/michael.wurster/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.vitepress/components/CollapsibleResumeItem.vue
@.vitepress/theme/styles/custom.css
@resume.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add `justify` prop to CollapsibleResumeItem and apply .justified class conditionally</name>
  <files>.vitepress/components/CollapsibleResumeItem.vue</files>
  <action>
    In the `defineProps` block, add an optional boolean prop `justify`:

    ```ts
    defineProps<{
      title: string
      justify?: boolean
    }>()
    ```

    In the template, update the inner `.content` div to conditionally include the `.justified` class:

    ```html
    <div :class="['content', { justified: justify }]">
    ```

    The `.justified` class is defined globally in `.vitepress/theme/styles/custom.css` — no scoped styles needed here. Do NOT add any local CSS for justification.
  </action>
  <verify>Open `.vitepress/components/CollapsibleResumeItem.vue` and confirm: `justify?: boolean` in defineProps, and `:class="['content', { justified: justify }]"` on the content div.</verify>
  <done>Component accepts optional `justify` prop; when true, adds `.justified` to the content div; when absent/false, no change to existing behavior.</done>
</task>

<task type="auto">
  <name>Task 2: Apply justify prop to Profile section in resume.md</name>
  <files>resume.md</files>
  <action>
    Find the `<CollapsibleResumeItem title="Profile">` tag and update it to pass the `justify` prop:

    ```md
    <CollapsibleResumeItem title="Profile" :justify="true">
    ```

    Leave all other `<CollapsibleResumeItem>` usages unchanged (Skills, and any work/education items).
  </action>
  <verify>Check `resume.md` — Profile entry has `:justify="true"`, all other CollapsibleResumeItem tags are unchanged.</verify>
  <done>Profile section renders with justified text; Skills and experience sections are unaffected.</done>
</task>

</tasks>

<verification>
Run the dev server (`npm run dev`) and open the resume page. Expand the Profile section — paragraph text should be justified with hyphenation. Expand the Skills section — text should NOT be justified. All other sections unaffected.
</verification>

<success_criteria>
- `justify?: boolean` prop exists in CollapsibleResumeItem
- `:class="['content', { justified: justify }]"` applied to the content div
- `<CollapsibleResumeItem title="Profile" :justify="true">` in resume.md
- No other CollapsibleResumeItem usages modified
</success_criteria>

<output>
After completion, create `.planning/quick/5-extend-collapsibleresumeitem-to-support-/5-SUMMARY.md`
</output>
