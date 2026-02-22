---
phase: quick/6-support-br-tags-in-resumeitem-subtitle-p
plan: 6
type: execute
wave: 1
depends_on: []
files_modified:
  - .vitepress/components/ResumeItem.vue
autonomous: true

must_haves:
  truths:
    - "subtitle prop containing <br> tags renders a visible line break"
    - "subtitle prop with plain text still renders correctly"
  artifacts:
    - path: ".vitepress/components/ResumeItem.vue"
      provides: "ResumeItem component with HTML-capable subtitle rendering"
      contains: "v-html"
  key_links:
    - from: ".vitepress/components/ResumeItem.vue subtitle prop"
      to: "rendered DOM"
      via: "v-html directive"
      pattern: "v-html"
---

<objective>
Enable `<br>` tags (and other safe inline HTML) in the `subtitle` prop of ResumeItem.vue.

Purpose: Allow multi-line subtitles without a dedicated slot or extra props — e.g. "B.Eng.,<br>Information Systems" renders as two lines.
Output: Updated ResumeItem.vue where subtitle is rendered via `v-html` instead of text interpolation.
</objective>

<execution_context>
@/Users/michael.wurster/.config/opencode/get-shit-done/workflows/execute-plan.md
@/Users/michael.wurster/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.vitepress/components/ResumeItem.vue
</context>

<tasks>

<task type="auto">
  <name>Task 1: Render subtitle via v-html to support inline HTML tags</name>
  <files>.vitepress/components/ResumeItem.vue</files>
  <action>
    On line 18, replace the text-interpolation paragraph:

    ```html
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    ```

    with a `v-html` binding:

    ```html
    <p v-if="subtitle" class="subtitle" v-html="subtitle"></p>
    ```

    No other changes needed. `v-html` renders the string as innerHTML so `<br>` tags produce real line breaks. Plain-text subtitles continue to work unchanged.
  </action>
  <verify>Run `npm run dev` (or `npx vitepress dev`) and open the resume page. Confirm the "Esslingen University" entry subtitle breaks across two lines where `<br>` is used. Also confirm other subtitle entries without `<br>` still display on one line.</verify>
  <done>Subtitles containing `<br>` render as line breaks; plain-text subtitles are unaffected.</done>
</task>

</tasks>

<verification>
- Open the resume page in the browser
- Locate the entry that has `<br>` in its subtitle
- Confirm text wraps at the `<br>` position
- Confirm other ResumeItem subtitles without `<br>` look identical to before
</verification>

<success_criteria>
`v-html` used for subtitle rendering; `<br>` tags in subtitle prop produce visible line breaks in the browser.
</success_criteria>

<output>
After completion, create `.planning/quick/6-support-br-tags-in-resumeitem-subtitle-p/6-SUMMARY.md`
</output>
