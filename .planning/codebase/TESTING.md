# Testing Patterns

**Analysis Date:** 2026-02-16

## Test Framework

**Runner:**
- None configured
- No test framework installed (no vitest, jest, mocha, or similar in `package.json`)
- No test configuration files exist

**Assertion Library:**
- None

**Run Commands:**
```bash
# No test commands defined in package.json
# Only available scripts:
npm run docs:dev       # Start dev server
npm run docs:build     # Build static site
npm run docs:preview   # Preview built site
```

## Test File Organization

**Location:**
- No test files exist anywhere in the codebase
- No `*.test.*`, `*.spec.*`, or `__tests__/` directories found

**Naming:**
- Not established

**Structure:**
- Not established

## Test Structure

**Suite Organization:**
- Not established — no tests exist

**Patterns:**
- Not established

## Mocking

**Framework:** None

**Patterns:**
- Not established

**What to Mock:**
- Not applicable for current codebase (static site with no runtime logic)

**What NOT to Mock:**
- Not applicable

## Fixtures and Factories

**Test Data:**
- Not established

**Location:**
- Not established

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# No coverage tool configured
```

## Test Types

**Unit Tests:**
- Not present. If added, potential targets would be:
  - Vue component rendering (`ResumeItem.vue`, `ResumeSection.vue`)
  - VitePress config validation (`.vitepress/config.mts`)

**Integration Tests:**
- Not present

**E2E Tests:**
- Not present. If added, could verify:
  - Page rendering and navigation
  - Resume data displays correctly
  - Social links are functional
  - GitHub Pages deployment produces valid output

**Build Verification:**
- The CI/CD pipeline (`.github/workflows/deploy.yaml`) runs `npm run docs:build` which serves as a basic build smoke test
- No explicit test step in the GitHub Actions workflow

## Common Patterns

**Async Testing:**
- Not established

**Error Testing:**
- Not established

## Recommendations for Adding Tests

If tests are introduced to this project:

**Recommended Framework:**
- Vitest (natural fit with Vite/VitePress ecosystem)
- Install: `npm install -D vitest @vue/test-utils`

**Recommended Test Targets:**
1. Vue component rendering tests for `ResumeItem.vue` and `ResumeSection.vue`
2. Build verification test (ensure `vitepress build` succeeds)
3. Link validation (ensure no broken links in markdown content)

**Recommended Config Location:**
- `vitest.config.ts` at project root

**Recommended Test File Location:**
- Co-located: `.vitepress/components/__tests__/ResumeItem.test.ts`
- Or dedicated: `tests/` directory at project root

---

*Testing analysis: 2026-02-16*
