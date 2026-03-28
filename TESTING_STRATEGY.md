# Testing Strategy — Skip Hire Booking Flow

## 1. Testing Pyramid

```
           ┌──────────┐
           │   E2E    │  3 Playwright specs (full flows)
          ─┼──────────┼─
         ──┼  Vitest  ┼──  Unit tests (utils + hooks)
        ───┴──────────┴───
```

**Unit tests (Vitest)** cover pure functions and hooks in isolation:
- `formatCurrency` — currency formatting edge cases
- `postcodeValidator` — UK postcode regex + normalization
- `deliveryDates` — weekday-only date generation logic
- `useApi` — fetch lifecycle (loading, success, error, retry)

**E2E tests (Playwright)** cover the 3 primary user flows end-to-end:
1. `general-waste-flow.spec.js` — standard booking, stepper navigation, post-confirm reset
2. `heavy-waste-flow.spec.js` — disabled skip enforcement, Step 4 gate (T&C + email + date)
3. `plasterboard-flow.spec.js` — branching logic, BUG-001 regression (state cleared on type change)

There is no integration layer between these two levels. The backend is simple enough (JSON fixtures, no DB) that the E2E tests provide adequate coverage of the API contract.

---

## 2. Why Deterministic Fixtures Over Mocks or a Real DB

Each fixture postcode encodes a distinct test scenario:

| Postcode | Scenario |
|----------|----------|
| SW1A 1AA | Happy path — 12+ addresses |
| EC1A 1BB | Empty result → auto-show manual entry form |
| M1 1AE   | Simulated 3s network latency → loading state |
| BS1 4DJ  | 500 on first call, 200 on retry → error + retry flow |

**Reproducibility**: Fixtures run identically in local dev, CI, and Docker — no external API keys, no rate limits, no data drift.

**Precision**: Each postcode is a named test scenario. The fixture postcodes appear verbatim in the E2E specs, making the intent self-documenting. A real postcode API would require mocking or a sandbox, adding complexity without improving coverage.

**Retry counter reset**: `GET /api/debug/reset-retry` is called in `beforeEach` for every spec, guaranteeing the BS1 4DJ error fires exactly once per test regardless of run order.

---

## 3. Selector Strategy

All E2E selectors are `data-testid` attributes, centralised in `automation/helpers/selectors.js`. No spec file contains a hardcoded selector string.

**Why `data-testid`:**
- Resilient to CSS refactors, component restructuring, and class renames
- Completely decoupled from visual styling
- Documents the intended interactivity of each element — if it has a `data-testid`, it is intentionally interactive or observable in tests

**Why centralised:**
- A single rename point when a testid changes
- Easy to audit which elements are under test coverage
- Dynamic selectors (e.g., `skipCard(size)`, `stepperStep(n)`) are functions in the same file

---

## 4. Manual Test Matrix

`manual-tests.md` contains 47 test cases across:

| Category | Count |
|----------|-------|
| Positive / happy path | 12 |
| Negative / validation | 14 |
| Edge cases | 9 |
| API failure / network | 6 |
| State transition / branching | 6 |

Each case includes: ID, title, steps, expected result, and pass/fail column.

Notable edge cases covered manually but not in automation:
- Session restore after browser refresh (sessionStorage persistence)
- Tab-order verification across all 4 steps
- Mobile viewport layout (375px)
- Keyboard-only booking completion
- Back-button behaviour between steps

---

## 5. Defect Lifecycle

All three defects followed the same lifecycle:

1. **Surfaced** — during exploratory testing of branching logic (BUG-001), keyboard navigation (BUG-002), and slow-network simulation (BUG-003)
2. **Documented** — each bug recorded in `bug-reports.md` with severity, steps to reproduce, expected vs. actual result, and root cause
3. **Fixed** — targeted one-line fixes in the identified components
4. **Regression-tested** — the Playwright spec previously asserting the bug behaviour was updated to assert the correct behaviour

| Bug | Severity | Root Cause | Fix |
|-----|----------|------------|-----|
| BUG-001 | Medium | `setWasteType` didn't clear `plasterboardOption` | Clear in same state update |
| BUG-002 | High | `disabled` prop not passed to `<button>` | Pass `disabled={disabled}` + ARIA labels |
| BUG-003 | Low | `setSubmitting(true)` called after `await` | Move to first line of `handleConfirm` |

---

## 6. Known Gaps

| Gap | Rationale |
|-----|-----------|
| No real postcode API | Fixture postcodes provide deterministic, scenario-specific behaviour without external dependencies |
| No payment gateway | Out of scope for a booking-flow assessment; the booking ID confirms intent |
| No authentication | This is a single-session flow; auth would add complexity without adding QA depth to the assessed areas |
| No database | JSON fixtures are sufficient for a stateless API; adds no reproducibility risk |
| No visual regression tests | No design system or pixel-level requirements defined; functional correctness is the assessment focus |
| No load/performance tests | Single-user flow; not a relevant risk for this assessment |
