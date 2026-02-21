---
phase: quick
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - .vitepress/components/ResumeProfile.vue
  - .vitepress/components/ResumeSkills.vue
  - .vitepress/components/Skills.vue
  - .vitepress/theme/index.ts
  - resume.md
autonomous: false

must_haves:
  truths:
    - "Profile section renders as readable prose (not raw HTML strings)"
    - "Skills section renders grouped skill categories with labels"
    - "Both sections remain collapsible with chevron toggle"
    - "resume.md has no <script setup> block and no profile/skills const strings"
  artifacts:
    - path: ".vitepress/components/ResumeProfile.vue"
      provides: "Collapsible profile wrapper using default slot"
    - path: ".vitepress/components/ResumeSkills.vue"
      provides: "Collapsible skills wrapper rendering Skills child components"
    - path: ".vitepress/components/Skills.vue"
      provides: "Individual skill category row with name prop and slot content"
  key_links:
    - from: "resume.md"
      to: "ResumeProfile.vue"
      via: "VitePress slot — markdown inside tags rendered as HTML"
    - from: "resume.md"
      to: "ResumeSkills.vue / Skills.vue"
      via: "nested component slots"
---

<objective>
Replace the inline `<script setup>` + HTML string pattern in resume.md with markdown-native Vue component slots for Profile and Skills sections.

Purpose: Prose and skill lists become plain readable markdown/text in resume.md — no raw HTML strings, no script setup bloat.
Output: Three new components (ResumeProfile, ResumeSkills, Skills), registered globally, and an updated resume.md using them.
</objective>

<execution_context>
@/Users/michael.wurster/.config/opencode/get-shit-done/workflows/execute-plan.md
@/Users/michael.wurster/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.vitepress/components/CollapsibleResumeItem.vue
@.vitepress/theme/index.ts
@resume.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create ResumeProfile, ResumeSkills, and Skills components</name>
  <files>
    .vitepress/components/ResumeProfile.vue
    .vitepress/components/ResumeSkills.vue
    .vitepress/components/Skills.vue
  </files>
  <action>
Create three Vue SFCs:

**ResumeProfile.vue** — wraps slot content in the CollapsibleResumeItem shell (reuse existing CSS classes directly rather than importing the component, to avoid prop conflicts with slots). Use the same markup and styles as CollapsibleResumeItem but replace `v-html="description"` with `<slot />`. Title is hardcoded as "Profile". Copy the `expanded`, `contentRef`, `contentHeight`, `toggle`, and `onMounted` logic verbatim. Add `.content` wrapper around `<slot />` so existing `:deep(.content p)` styles apply.

**ResumeSkills.vue** — same collapsible shell, title hardcoded as "Skills". Inside `.content`, render `<slot />` which will contain `<Skills>` children. Add minimal list styling so skill rows stack vertically (use `display: flex; flex-direction: column; gap: 0.3rem;` on a wrapper div if needed).

**ResumeSkills.vue** note: VitePress does NOT process markdown inside component slots that contain other components — but the Skills child components themselves render their own content, so this is fine. The slot here just receives `<Skills>` component nodes.

**Skills.vue** — accepts `name` prop (String, required). Renders a single skill row:
```html
<div class="skill-row">
  <strong>{{ name }}:</strong>
  <span><slot /></span>
</div>
```
Style `.skill-row` with `font-size: .9rem; margin: 0.1rem 0;`. The slot content is the comma-separated list from resume.md.

Do NOT import CollapsibleResumeItem inside these components — duplicate the minimal shell markup to avoid nested component complexity with slots.
  </action>
  <verify>Files exist at the three paths. Open each and confirm template structure visually.</verify>
  <done>Three .vue files created with correct template, script setup, and scoped styles.</done>
</task>

<task type="auto">
  <name>Task 2: Register new components and rewrite resume.md</name>
  <files>
    .vitepress/theme/index.ts
    resume.md
  </files>
  <action>
**index.ts:** Add imports and registrations for the three new components alongside existing ones:
```ts
import ResumeProfile from "../components/ResumeProfile.vue";
import ResumeSkills from "../components/ResumeSkills.vue";
import Skills from "../components/Skills.vue";
// in enhanceApp:
app.component('ResumeProfile', ResumeProfile)
app.component('ResumeSkills', ResumeSkills)
app.component('Skills', Skills)
```

**resume.md:** Remove the entire `<script setup lang="ts">` block including the closing `</script>` tag (keep only the `experience` and `education` arrays — move them to a retained `<script setup>` block).

Replace:
```markdown
<CollapsibleResumeItem title="Profile" :description="profile"/>
<CollapsibleResumeItem title="Skills" :description="skills"/>
```

With:
```markdown
<ResumeProfile>

I'm a Senior Software Engineer with 10+ years of experience building and operating complex, customer-facing systems across startup and enterprise environments. Over the last four years, I've worked continuously on the same product, a quantum-as-a-service platform, carrying end-to-end responsibility from product discovery and system architecture through implementation, automated deployment, and production operations. In this context, I've designed and evolved both system-level and code-level architectures, applying proven patterns for distributed and loosely coupled systems to support long-term maintainability and change tolerance. Beyond the core platform, I regularly contribute by shaping architectural direction and operational practices across multiple product streams.

I enjoy working at the intersection of product and engineering, especially in early-stage, fast-moving environments where requirements are incomplete and engineers are trusted to define scope, make trade-offs, and ship. My work spans the full lifecycle: collaborating on problem definition, implementing customer-facing features, designing backend services and data models, and establishing CI/CD and GitOps workflows. I place strong emphasis on clear architectural boundaries and sustainable design, using principles such as Domain-Driven Design and Clean Architecture to enable systems to evolve over time.

I've worked closely with customers, sales, and business stakeholders, and regularly use monitoring and usage data to guide technical and product decisions. Technically, I'm strongest in TypeScript (Vue.js, React, Node.js), Java (Spring Boot), Python, and PostgreSQL, with deep experience building cloud-native systems on Kubernetes and public cloud platforms (GCP, AWS, Azure). I'm motivated by roles where engineers carry responsibility from initial design through production operation and long-term maintenance.

</ResumeProfile>

<ResumeSkills>
<Skills name="Languages & Frameworks">Java (Spring Boot, Maven), TypeScript (Node.js, Vue.js, React, Angular), Python</Skills>
<Skills name="Data & Messaging">PostgreSQL, MySQL, Redis, Oracle DB, Microsoft SQL Server, ActiveMQ, Amazon SQS, Google Pub/Sub</Skills>
<Skills name="Cloud-Native & Platforms">Kubernetes, Docker, Google Cloud Platform (GCP), AWS, Azure</Skills>
<Skills name="CI/CD & DevOps">GitLab CI, GitHub Actions, Jenkins, Helm, ArgoCD, Terraform, Ansible, Loki, Datadog, Grafana</Skills>
<Skills name="Architecture & Design">Distributed and loosely coupled systems, Domain-Driven Design (DDD), Clean Architecture, designing for long-term evolution and maintainability</Skills>
<Skills name="Engineering Practices">End-to-end ownership, Continuous Delivery, Trunk-based Development, Pair & Mob Programming, GitOps</Skills>
</ResumeSkills>
```

The retained `<script setup>` block should contain only `experience` and `education` arrays (unchanged from original).

Preserve the rest of resume.md (title, `## Experience`, `## Education`, `<ResumeSection>` calls) exactly as-is.
  </action>
  <verify>
1. `cat resume.md` shows no `profile` or `skills` const strings, only `experience` and `education` in script setup.
2. `cat resume.md` shows `<ResumeProfile>` and `<ResumeSkills>` blocks with plain text / `<Skills>` children.
3. `cat .vitepress/theme/index.ts` shows all three new components registered.
  </verify>
  <done>resume.md uses new slot-based components with no HTML strings; all three components registered in theme.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: Verify resume page renders correctly in browser</name>
  <what-built>ResumeProfile, ResumeSkills, Skills components + updated resume.md with slot-based markdown content</what-built>
  <how-to-verify>
1. Run `npm run dev` (or it may already be running)
2. Open http://localhost:5173/resume (or the local VitePress dev URL)
3. Verify Profile section: collapsible box titled "Profile" — click to expand, confirm prose paragraphs render correctly (not raw HTML tags)
4. Verify Skills section: collapsible box titled "Skills" — click to expand, confirm each skill category appears as "**Name:** comma list" rows
5. Verify Experience and Education sections still render correctly (no regression)
  </how-to-verify>
  <resume-signal>Type "approved" if everything looks correct, or describe any visual issues</resume-signal>
  <action>Human verification of rendered resume page in browser</action>
  <verify>User confirms Profile and Skills sections expand/collapse correctly and render without raw HTML</verify>
  <done>User types "approved" after visual inspection</done>
</task>

</tasks>

<verification>
- `resume.md` contains no raw HTML strings for profile or skills
- `resume.md` `<script setup>` contains only `experience` and `education` arrays
- All three new components exist and are registered in `index.ts`
- Resume page renders collapsible Profile and Skills sections correctly
</verification>

<success_criteria>
Profile and Skills sections in resume.md are written as plain text/markdown inside slot-based Vue components — no HTML strings, no prose in script setup. The visual output (collapsible boxes with chevron) is unchanged from the current design.
</success_criteria>

<output>
After completion, create `.planning/quick/1-refactor-resume-profile-and-skills-to-us/1-SUMMARY.md`
</output>
