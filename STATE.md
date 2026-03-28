## Completed Tasks (Portfolio Upgrade — 2026-03-22)

### Bug Fixes
- **BUG-001**: Fixed `setWasteType` in `BookingContext.jsx` to clear `plasterboardOption: null` on type change
- **BUG-002**: Fixed `SkipCard.jsx` to pass `disabled={disabled}` to `<button>`; added ARIA labels for WCAG compliance
- **BUG-003**: Fixed `ConfirmButton.jsx` — moved `setSubmitting(true)` before `fetch`; added inline error recovery (`data-testid="confirm-error"`)
- `bug-reports.md` updated with Status: Fixed + one-line Fix descriptions

### New Features
- **F-001 Session Persistence**: `BookingContext` initialises from `sessionStorage` on mount; persists on every state change; clears on `resetBooking()`
- **F-002 Start New Booking**: Success screen in `ReviewSummary` has `data-testid="start-new-booking"` button that resets state and navigates to `/step/1`
- **F-003 Confirmation Error Recovery**: `ConfirmButton` shows inline error and re-enables on API failure
- **F-004 Clickable Stepper**: Completed steps in `Stepper.jsx` render as `<button>` with `aria-label`; `App.jsx` passes `onStepClick` handler
- **F-005 Delivery Date Picker**: `DeliveryDatePicker.jsx` renders `<input type="date">` limited to next 14 weekdays; logic extracted to `src/utils/deliveryDates.js`
- **F-006 Contact Info**: `ContactInfo.jsx` — email (required, validated on blur) + phone (optional); stored in `BookingContext`
- **F-007 Terms Checkbox**: `data-testid="terms-checkbox"` in `ReviewSummary`; Confirm button disabled until email + date + terms all satisfied

### Testing
- **Vitest** installed (`vitest`, `@vitest/coverage-v8`, `@testing-library/react`)
- `vitest.config.js` created (jsdom, V8 coverage, excludes automation/ and .claude/)
- `package.json` scripts: `test:unit`, `test:unit:coverage`
- Unit tests created (all 32 pass):
  - `src/utils/formatCurrency.test.js`
  - `src/utils/postcodeValidator.test.js`
  - `src/utils/deliveryDates.test.js`
  - `src/hooks/useApi.test.js`
- All 3 Playwright specs updated to fill contact email, delivery date, and T&C before confirming
- New E2E test cases added: stepper navigation, Start New Booking, T&C gate
- BUG-001 regression test updated to assert plasterboard option is NOT shown after switching to general
- BUG-002 regression test updated to assert disabled card `toBeDisabled()`
- `automation/helpers/selectors.js` updated with new selectors

### Documentation
- `.github/workflows/ci.yml` created: unit-tests job → e2e-tests job (needs: unit-tests)
- `TESTING_STRATEGY.md` created: pyramid, fixture rationale, selector strategy, defect lifecycle, known gaps
- `README.md` overhauled: CI badge, architecture ASCII diagram, what-this-demonstrates, fixture table, quick start, testing commands, project structure

---

## Open Issues
None.

---

## Notes
- Render.com account: deployed at https://booking-flow-0jfo.onrender.com
- GitHub repo must be public for CI badge to render
- Free tier cold start: ~30s

---

*Last updated: 2026-03-22 — Portfolio upgrade complete*
