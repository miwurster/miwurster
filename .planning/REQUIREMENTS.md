# Requirements: CollapsibleResumeItem

**Defined:** 2026-02-16
**Core Value:** Resume page becomes scannable — readers expand only what interests them

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Core Behavior

- [ ] **CORE-01**: User can click the header row to toggle content between collapsed and expanded states
- [ ] **CORE-02**: Component starts in collapsed state when the page loads
- [ ] **CORE-03**: Collapsed state shows approximately one line of content with a gradient fade-out effect
- [ ] **CORE-04**: A chevron icon in the header rotates to indicate expanded/collapsed state
- [ ] **CORE-05**: Content expands and collapses with a smooth CSS slide animation
- [ ] **CORE-06**: Component renders HTML content strings passed via the description prop using v-html

### Integration

- [ ] **INTG-01**: CollapsibleResumeItem is globally registered in the VitePress theme
- [ ] **INTG-02**: Profile section in resume.md uses CollapsibleResumeItem instead of ResumeItem
- [ ] **INTG-03**: Skills section in resume.md uses CollapsibleResumeItem instead of ResumeItem

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Accessibility

- **A11Y-01**: User can toggle expand/collapse via keyboard (Enter/Space)
- **A11Y-02**: Component uses ARIA attributes (aria-expanded, aria-controls)
- **A11Y-03**: Animation respects prefers-reduced-motion user preference

### Polish

- **PLSH-01**: Configurable preview height via component prop
- **PLSH-02**: Print-friendly styles that expand all content when printing
- **PLSH-03**: Dark/light theme support for fade overlay using VitePress CSS variables

## Out of Scope

| Feature | Reason |
|---------|--------|
| Collapsible behavior for Experience/Education | Those are multi-item lists via ResumeSection; different interaction model |
| Persist expand/collapse state across navigations | Static site with no state management; unnecessary complexity |
| Accordion group behavior (mutual exclusion) | Profile and Skills are independent; collapsing one when other opens worsens UX |
| "Show more/less" text label | Chevron with cursor change is sufficient visual affordance |
| Animation library (GSAP, Motion) | CSS transitions are sufficient; no added bundle size |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CORE-01 | Phase 1 | Pending |
| CORE-02 | Phase 1 | Pending |
| CORE-03 | Phase 1 | Pending |
| CORE-04 | Phase 1 | Pending |
| CORE-05 | Phase 1 | Pending |
| CORE-06 | Phase 1 | Pending |
| INTG-01 | Phase 2 | Pending |
| INTG-02 | Phase 2 | Pending |
| INTG-03 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-16*
*Last updated: 2026-02-16 after roadmap creation*
