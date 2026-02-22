# Quick Task 3 Plan

**Task:** Fix blockquote styling in ResumeItem: match paragraph font and reduce top margin
**Date:** 2026-02-22

## Tasks

### Task 1: Add `:deep(.description blockquote)` scoped style to ResumeItem.vue

**Files:** `.vitepress/components/ResumeItem.vue`

**Action:** Add `:deep()` CSS rules for `blockquote` and `blockquote p` inside `.description` to:
- Set `font-size: .9rem` and `font-weight: 400` to match surrounding paragraph text
- Set `line-height: 1.3rem` consistent with the rest of `.description`
- Remove default top margin (`margin: 0 0 .3rem 0`)
- Keep a subtle left border (`border-left: 3px solid #e1e9ee`) for visual distinction
- Reset `color: inherit` to prevent VitePress default muted color
- Reset `blockquote p` margin to `0`

**Done:** Blockquote in experience entries renders at the same size as bullet text with no excess top margin.
