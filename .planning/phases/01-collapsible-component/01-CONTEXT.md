# Phase 1: Collapsible Component - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

A standalone CollapsibleResumeItem Vue component that toggles between collapsed (one-line preview with gradient fade-out) and expanded states via smooth CSS animation. It accepts HTML content via a description prop and shows a rotating chevron indicator. This phase builds the component only — site integration is Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Chevron & visual indicators
- Chevron sits on the **right side** of the header row (header text left, chevron pushed far right)
- Chevron points **right** when collapsed, rotates **down** when expanded
- Chevron is **subtle** — smaller size, muted color, doesn't compete with header text
- **Chevron alone** signals expand/collapse — no extra borders, backgrounds, or decorations on the collapsed state

### Claude's Discretion
- Collapsed preview appearance (how much content shows, fade-out gradient style, preview height)
- Expand/collapse interaction details (click target area, hover states, keyboard/accessibility)
- Animation timing and easing (speed, curve)
- Exact chevron size, color, and rotation transition

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-collapsible-component*
*Context gathered: 2026-02-16*
