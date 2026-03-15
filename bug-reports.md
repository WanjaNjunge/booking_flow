# Bug Reports — Booking Flow

## BUG-001

| Field | Details |
|---|---|
| Bug ID | BUG-001 |
| Title | Plasterboard option persists in booking after switching to General waste |
| Severity | Medium |
| Priority | P2 |
| Environment | Chrome 124, Desktop, localhost:3000 |
| Steps to Reproduce | 1. Enter SW1A 1AA, select address, proceed to Step 2. 2. Select "Plasterboard" waste type. 3. Choose "Dedicated plasterboard skip" handling option. 4. Click Back to Step 2. 5. Switch to "General waste". 6. Continue through Steps 3 and 4 and confirm booking. |
| Expected Result | plasterboardOption should be null/cleared in the confirmed booking payload |
| Actual Result | plasterboardOption: "Dedicated plasterboard skip" is submitted with the booking |
| Root Cause | BookingContext does not clear plasterboardOption when waste type changes away from Plasterboard |
| Evidence | Screenshot/video TBD |

---

## BUG-002

| Field | Details |
|---|---|
| Bug ID | BUG-002 |
| Title | Disabled skip cards are keyboard-selectable |
| Severity | High |
| Priority | P1 |
| Environment | Chrome 124, Desktop, localhost:3000 |
| Steps to Reproduce | 1. Enter SW1A 1AA, select address, choose "Heavy waste". 2. Proceed to Step 3 (skip selection). 3. Tab to a greyed-out/disabled skip card. 4. Press Enter or Space. |
| Expected Result | Disabled skip cards should not be focusable or selectable via keyboard |
| Actual Result | Disabled skip card is focused and selected; booking proceeds with a disabled skip size |
| Root Cause | disabled prop not passed to the underlying `<button>` element; only the CSS class is applied |
| Evidence | Screenshot/video TBD |

---

## BUG-003

| Field | Details |
|---|---|
| Bug ID | BUG-003 |
| Title | Double-click on Confirm Booking submits duplicate requests |
| Severity | Low |
| Priority | P3 |
| Environment | Chrome 124, Desktop, localhost:3000 |
| Steps to Reproduce | 1. Complete Steps 1–3 with any valid selections. 2. On Step 4, throttle network to Slow 3G in DevTools. 3. Click "Confirm Booking". 4. Quickly click "Confirm Booking" again before spinner appears. |
| Expected Result | Button disables immediately on first click; only one API call is made |
| Actual Result | Two POST /api/booking/confirm requests are sent; button remains clickable during the first request |
| Root Cause | setSubmitting(true) is called after the await resolves, not before the async call begins |
| Evidence | Screenshot/video TBD |
