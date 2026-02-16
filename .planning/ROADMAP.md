# Roadmap: CollapsibleResumeItem

## Overview

Build a `CollapsibleResumeItem` Vue component that makes Profile and Skills sections on the resume page collapsible, then integrate it into the live site. The component starts collapsed with a one-line preview and fade-out, expands/collapses smoothly on click with a rotating chevron indicator.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Collapsible Component** - Build the CollapsibleResumeItem component with all expand/collapse behavior
- [ ] **Phase 2: Site Integration** - Register the component and replace static Profile/Skills sections

## Phase Details

### Phase 1: Collapsible Component
**Goal**: A standalone CollapsibleResumeItem Vue component exists that toggles between collapsed (preview with fade) and expanded states via smooth animation
**Depends on**: Nothing (first phase)
**Requirements**: CORE-01, CORE-02, CORE-03, CORE-04, CORE-05, CORE-06
**Success Criteria** (what must be TRUE):
  1. User can click the header row to toggle between collapsed and expanded content
  2. Component renders collapsed on initial load, showing approximately one line of content with a gradient fade-out
  3. A chevron icon rotates to reflect expanded/collapsed state
  4. Content slides open and closed with a smooth CSS animation (no jump or flicker)
  5. HTML content strings passed via the description prop render correctly in both states
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md — Build CollapsibleResumeItem component with expand/collapse behavior

### Phase 2: Site Integration
**Goal**: The resume page uses CollapsibleResumeItem for Profile and Skills sections, making the live site scannable
**Depends on**: Phase 1
**Requirements**: INTG-01, INTG-02, INTG-03
**Success Criteria** (what must be TRUE):
  1. CollapsibleResumeItem is globally available in the VitePress theme (registered in theme/index.ts)
  2. Profile section on the resume page renders as a collapsible card instead of a static ResumeItem
  3. Skills section on the resume page renders as a collapsible card instead of a static ResumeItem
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Collapsible Component | 0/1 | Planned | - |
| 2. Site Integration | 0/0 | Not started | - |
