---
phase: quick-2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .vitepress/components/ResumeItem.vue
  - .vitepress/components/ResumeSection.vue
  - resume.md
autonomous: true

must_haves:
  truths:
    - "Experience section renders all 4 jobs with titles, subtitles, dates, and locations"
    - "Education section renders both entries with titles, subtitles, and dates"
    - "Descriptions render as formatted bullet lists (not raw HTML strings)"
    - "Experience and Education are wrapped in collapsible sections like Profile/Skills"
    - "resume.md has no <script setup> block"
  artifacts:
    - path: ".vitepress/components/ResumeItem.vue"
      provides: "Slot-based description rendering (no v-html, no description prop)"
    - path: "resume.md"
      provides: "Slot-based Experience and Education via direct <ResumeItem> usage"
  key_links:
    - from: "resume.md ResumeItem slots"
      to: "ResumeItem.vue <slot />"
      via: "VitePress markdown slot rendering"
      pattern: "<slot"
---

<objective>
Refactor Work Experience and Education on resume.md to use markdown slot content instead of JS arrays with raw HTML strings — matching the pattern already used by Profile and Skills.

Purpose: Eliminates the `<script setup>` block entirely, makes experience/education content editable as markdown, and wraps both sections in collapsible `<CollapsibleResumeItem>` containers.
Output: Updated ResumeItem.vue (slot-based), deleted ResumeSection.vue, updated resume.md.
</objective>

<execution_context>
@/Users/michael.wurster/.config/opencode/get-shit-done/workflows/execute-plan.md
@/Users/michael.wurster/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.vitepress/components/ResumeItem.vue
@.vitepress/components/ResumeSection.vue
@.vitepress/components/CollapsibleResumeItem.vue
@resume.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Refactor ResumeItem.vue to use slot instead of v-html description prop</name>
  <files>.vitepress/components/ResumeItem.vue</files>
  <action>
    Replace the `description` prop with a `<slot />` for description content.

    Changes:
    - Remove `description?: string` from the `defineProps` type (keep title, subtitle, start, end, location)
    - Remove the `v-if="description"` div with `v-html="description"` from the template
    - Add a `<div class="description"><slot /></div>` in its place (always rendered — if no slot content, it's empty and harmless)
    - Keep all existing styles unchanged (the `:deep(.description ul)`, `:deep(.description li)`, `:deep(.description a)` rules still apply to slot content)

    The final template structure should be:
    ```
    <div class="box">
      <div class="box-header">
        ... (title/subtitle/date/location — unchanged)
      </div>
      <div class="description"><slot /></div>
    </div>
    ```
  </action>
  <verify>No TypeScript errors: `npx vue-tsc --noEmit` or just inspect for prop/slot correctness visually</verify>
  <done>ResumeItem.vue has no `description` prop and uses `<slot />` for description area</done>
</task>

<task type="auto">
  <name>Task 2: Rewrite resume.md — slot-based Experience and Education, remove script block</name>
  <files>resume.md</files>
  <action>
    Replace the entire `<script setup>` block and the `## Experience` / `## Education` sections with slot-based markup. Keep Profile and Skills sections exactly as-is.

    Structure for Experience — wrap all ResumeItems inside a CollapsibleResumeItem:

    ```markdown
    <CollapsibleResumeItem title="Experience">

    <ResumeItem title="Senior Software Engineer, Product & Platform" subtitle="Kipu Quantum GmbH - Full-Time" start="05/2024" end="Present" location="Karlsruhe, Germany - Remote">

    > Seed-stage deep-tech startup; continuation of the PLANQK Platform following acquisition from Anaqor; same product, team, and codebase

    - Led the continued end-to-end development of a production quantum-as-a-service platform...
    - Carried responsibility for system architecture and technical direction...
    [... all bullet points ...]

    </ResumeItem>

    <ResumeItem title="Senior Software Engineer, Product & Platform" subtitle="Anaqor - Full-Time" start="07/2021" end="04/2024" location="Berlin, Germany - Remote">
    ...
    </ResumeItem>

    [... remaining 2 experience entries ...]

    </CollapsibleResumeItem>
    ```

    Structure for Education — same pattern:

    ```markdown
    <CollapsibleResumeItem title="Education">

    <ResumeItem title="Reutlingen University" subtitle="Master of Science (M.Sc.), Services Computing" start="10/2014" end="08/2016">

    Focus on Cloud Computing, Software Architecture, and Cloud-Native Software Engineering.
    Master's thesis at the Institute of Architecture of Application Systems (University of Stuttgart).

    </ResumeItem>

    <ResumeItem title="Esslingen University" subtitle="Bachelor of Engineering (B.Eng.), Information Systems (Wirtschaftsinformatik)" start="10/2006" end="02/2010">

    Focus on Business Process Management & Software Engineering.
    Bachelor's thesis at Hewlett Packard Enterprise.

    </ResumeItem>

    </CollapsibleResumeItem>
    ```

    Preserve all bullet point content from the original JS arrays — convert `<li>` items to `- ` markdown bullets and `<blockquote>` items to `> ` markdown blockquotes. Preserve all text exactly.

    The `## Experience` and `## Education` h2 headings are removed — the CollapsibleResumeItem title serves as the section label.

    Remove the entire `<script setup lang="ts">...</script>` block (lines 5–105 in the current file).

    Keep the frontmatter, `# Resume` heading, `<p></p>` spacer, and the Profile/Skills CollapsibleResumeItems exactly as they are.
  </action>
  <verify>Run `npm run dev` and open the resume page in the browser. Verify: (1) Profile and Skills still work as before, (2) Experience and Education are now collapsible sections, (3) each job/degree entry renders with correct title, subtitle, dates, location, and bullet list content</verify>
  <done>resume.md has no script block; Experience and Education render as collapsible sections with slot-based markdown content</done>
</task>

<task type="auto">
  <name>Task 3: Delete ResumeSection.vue (no longer needed)</name>
  <files>.vitepress/components/ResumeSection.vue</files>
  <action>
    Delete the file `.vitepress/components/ResumeSection.vue` — it is no longer referenced anywhere after the resume.md rewrite.

    Use: `rm .vitepress/components/ResumeSection.vue`

    Also check if it is registered in any VitePress config or index file and remove those references if found:
    ```bash
    grep -r "ResumeSection" .vitepress/
    ```
    If any references remain, remove them.
  </action>
  <verify>`grep -r "ResumeSection" .` returns no results (file deleted and no lingering imports)</verify>
  <done>ResumeSection.vue is deleted and no references to it remain in the codebase</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    - ResumeItem.vue now uses slot-based description (no v-html)
    - resume.md has no script block; Experience and Education use CollapsibleResumeItem + ResumeItem with slot content
    - ResumeSection.vue deleted
  </what-built>
  <how-to-verify>
    1. Run `npm run dev` and open http://localhost:5173/resume (or wherever VitePress serves)
    2. Expand the "Experience" section — verify all 4 jobs appear with correct titles, companies, date ranges, and bullet lists
    3. Expand the "Education" section — verify both entries appear with correct titles, degrees, and dates
    4. Expand "Profile" and "Skills" — confirm they still work exactly as before (no regressions)
    5. Check that bullet points and blockquotes (the "Seed-stage deep-tech startup" note) render correctly
  </how-to-verify>
  <resume-signal>Type "approved" or describe any rendering issues</resume-signal>
</task>

</tasks>

<verification>
- `grep -r "ResumeSection" .` → no results
- `grep "script setup" resume.md` → no results
- `grep "<slot" .vitepress/components/ResumeItem.vue` → matches
- VitePress dev server starts without errors
- Resume page renders Experience and Education as collapsible sections with full content
</verification>

<success_criteria>
- resume.md has zero JavaScript — no `<script setup>` block
- All experience and education content is written as markdown inside component slots
- Experience and Education sections are collapsible (using CollapsibleResumeItem)
- ResumeSection.vue is deleted
- Profile and Skills sections are unaffected
- No visual regressions on the resume page
</success_criteria>

<output>
After completion, create `.planning/quick/2-refactor-resume-work-and-education-exper/2-SUMMARY.md`
</output>
