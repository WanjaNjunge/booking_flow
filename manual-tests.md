# Manual Test Cases — Booking Flow

> Minimum 35 test cases: 10 negative, 6 edge cases, 4 API failure, 4 state transition.

<!-- Test cases will be added during implementation -->

| TC ID | Category | Step | Test Description | Preconditions | Steps | Expected Result | Status |
|-------|----------|------|------------------|---------------|-------|-----------------|--------|
| TC ID | Category | Step | Test Description | Preconditions | Steps | Expected Result | Status |
|-------|----------|------|------------------|---------------|-------|-----------------|--------|
| TC-001 | Positive | Step 1 | Valid postcode SW1A 1AA returns 12 addresses | App open on Step 1 | 1. Enter SW1A 1AA. 2. Click Find Address. | Returns list of 12+ addresses. | Pass |
| TC-002 | Positive | Step 1 | Address selection navigates to Step 2 | Addresses loaded for SW1A 1AA | 1. Select '10 Downing Street' from list. | Navigates to Step 2: Waste Type. | Pass |
| TC-003 | Positive | Step 1 | Manual entry with valid data navigates to Step 2 | App open on Step 1 | 1. Click 'Enter address manually'. 2. Fill Address Line 1 and City. 3. Click Continue. | Navigates to Step 2: Waste Type. | Pass |
| TC-004 | Negative | Step 1 | Empty postcode field shows validation error | App open on Step 1 | 1. Leave postcode blank. 2. Click Find Address. | "Please enter a valid UK postcode" error appears. | Pass |
| TC-005 | Negative | Step 1 | Invalid format "ABCDEF" shows validation error | App open on Step 1 | 1. Enter "ABCDEF". 2. Click Find Address. | "Please enter a valid UK postcode" error appears. | Pass |
| TC-006 | Negative | Step 1 | Numeric only "12345" shows validation error | App open on Step 1 | 1. Enter "12345". 2. Click Find Address. | "Please enter a valid UK postcode" error appears. | Pass |
| TC-007 | Negative | Step 1 | Partial postcode "SW1" shows validation error | App open on Step 1 | 1. Enter "SW1". 2. Click Find Address. | "Please enter a valid UK postcode" error appears. | Pass |
| TC-008 | Edge | Step 1 | Lowercase postcode "sw1a 1aa" is normalized and accepted | App open on Step 1 | 1. Enter "sw1a 1aa". 2. Click Find Address. | Input auto-capitalizes, returns addresses. | Pass |
| TC-009 | Edge | Step 1 | Postcode without space "SW1A1AA" is normalized and accepted | App open on Step 1 | 1. Enter "SW1A1AA". 2. Click Find Address. | Space is inserted, returns addresses. | Pass |
| TC-010 | Edge | Step 1 | EC1A 1BB returns empty state and auto-shows manual entry | App open on Step 1 | 1. Enter "EC1A 1BB". 2. Click Find Address. | Address list is empty, manual entry form appears. | Pass |
| TC-011 | API | Step 1 | M1 1AE shows loading spinner for ~3 seconds | App open on Step 1 | 1. Enter "M1 1AE". 2. Click Find Address. | Loading spinner displays. Returns addresses after ~3s. | Pass |
| TC-012 | API | Step 1 | BS1 4DJ first call shows error state with retry button | App open on Step 1 | 1. Enter "BS1 4DJ". 2. Click Find Address. | "Failed to fetch addresses" error state with Retry button. | Pass |
| TC-013 | API | Step 1 | BS1 4DJ retry call succeeds and shows addresses | Reached retry state from TC-012 | 1. Click 'Retry'. | Loading spinner displays, then returns list of addresses. | Pass |
| TC-014 | State | Step 1 | Changing postcode after address selected resets address state | Reached Step 2 | 1. Click Back to Step 1. 2. Edit postcode to another value. 3. Click Find Address. | Previously selected address is cleared. | Pass |
| TC-015 | Positive | Step 2 | General waste selection shows no plasterboard options | Reached Step 2 | 1. Select 'General Waste'. | Plasterboard radio buttons do not appear. | Pass |
| TC-016 | Positive | Step 2 | Heavy waste selection shows no plasterboard options | Reached Step 2 | 1. Select 'Heavy Waste'. | Plasterboard radio buttons do not appear. | Pass |
| TC-017 | Positive | Step 2 | Plasterboard selection shows 3 handling options | Reached Step 2 | 1. Select 'Plasterboard'. | Three radio buttons (Mix, Bag, Dedicated skip) appear below. | Pass |
| TC-018 | Positive | Step 2 | Selecting all 3 plasterboard options individually works | Selected Plasterboard on Step 2 | 1. Click 'Bag it separately'. 2. Click 'Dedicated skip'. | Radio button selection updates accordingly. | Pass |
| TC-019 | Negative | Step 2 | Plasterboard selected but no option — continue blocked | Selected Plasterboard on Step 2 | 1. Do not select any radio button. 2. Click Continue. | Continue button is disabled, cannot proceed. | Pass |
| TC-020 | Negative | Step 2 | No waste type selected — continue blocked | Reached Step 2 | 1. Do not select any waste type. 2. Click Continue. | Continue button is disabled, cannot proceed. | Pass |
| TC-021 | Edge | Step 2 | Switching from Plasterboard to General hides options | Selected Plasterboard on Step 2 | 1. Select 'General Waste'. | Plasterboard radio options disappear. | Pass |
| TC-022 | State | Step 2 | BUG-001: plasterboard option persists after switching to general waste | Reached Step 2 | 1. Select 'Plasterboard'. 2. Select 'Bag it'. 3. Switch to 'General Waste'. 4. Continue to Step 4. | 'Bag it separately' is incorrectly shown in the Step 4 Review. | Fail |
| TC-023 | State | Step 2 | Back navigation from Step 2 preserves postcode/address | Reached Step 2 | 1. Click 'Back'. | Step 1 shown with previous postcode and selected address. | Pass |
| TC-024 | Positive | Step 3 | General waste shows 8 skips, none disabled | Continuing to Step 3 from General Waste | 1. Observe skip cards array. | 8 skip size cards displayed, none greyed out or disabled. | Pass |
| TC-025 | Positive | Step 3 | Heavy waste shows 12-yard and 14-yard as disabled | Continuing to Step 3 from Heavy Waste | 1. Observe 12-yard and 14-yard skip cards. | Cards are greyed out, have 'disabled' attribute, cannot be clicked. | Pass |
| TC-026 | Positive | Step 3 | Selecting an enabled skip highlights it | Reached Step 3 | 1. Click '4-yard' skip. | Border changes color/thickness, card is visually highlighted. | Pass |
| TC-027 | Positive | Step 3 | Selecting different skip updates selection | Selected '4-yard' on Step 3 | 1. Click '6-yard' skip. | Highlight moves from 4-yard to 6-yard. | Pass |
| TC-028 | Negative | Step 3 | No skip selected — continue blocked | Reached Step 3 | 1. Ensure no skip is selected. 2. Click Continue. | Continue button is disabled, cannot proceed. | Pass |
| TC-029 | Negative | Step 3 | BUG-002: disabled skip card focusable via keyboard Tab | Reached Step 3 via Heavy Waste | 1. Press Tab key until focus reaches 12-yard skip. | 12-yard skip receives focus outline despite being disabled. | Fail |
| TC-030 | Edge | Step 3 | Postcode normalized (spaces removed) in API call | Intercepting network on Step 3 load | 1. Enter "SW1A 1AA" on Step 1. 2. Proceed to Step 3. | API request is `/api/skips?postcode=SW1A1AA&heavyWaste=false` | Pass |
| TC-031 | Edge | Step 3 | Deselecting a skip and reselecting works correctly | Reached Step 3 | 1. Click 4-yard. 2. Click 6-yard. 3. Click 4-yard. | 4-yard is ultimately selected. | Pass |
| TC-032 | State | Step 3 | Back navigation from Step 3 preserves waste type selection | Reached Step 3 via Heavy Waste | 1. Click 'Back'. | Step 2 shows 'Heavy Waste' still selected. | Pass |
| TC-033 | API | Step 3 | Skip API call includes correct heavyWaste parameter | Intercepting network on Step 3 load | 1. Select Heavy Waste on Step 2. 2. Proceed to Step 3. | API request is `/api/skips?postcode=...&heavyWaste=true` | Pass |
| TC-034 | Positive | Step 4 | Review shows correct postcode, address, waste type, skip | Reached Step 4 | 1. Review all text fields. | Values match selections from Steps 1-3. | Pass |
| TC-035 | Positive | Step 4 | Price breakdown shows correct base, VAT (20%), total | Reached Step 4 (e.g. 4-yard via API mock) | 1. Verify price calculation. | Base + (Base * 0.20) = Total exactly. | Pass |
| TC-036 | Positive | Step 4 | Confirm booking returns BK- prefixed bookingId | Reached Step 4 | 1. Click Confirm Booking. | Success screen shows ID like 'BK-12345678'. | Pass |
| TC-037 | Positive | Step 4 | Plasterboard option shown in review when selected | Reached Step 4 via Plasterboard -> Mix | 1. Check Waste Type section. | Explicitly lists 'Handling: Mix with other waste'. | Pass |
| TC-038 | Negative | Step 4 | BUG-003: double click on confirm within 1500ms window allows second submission | Reached Step 4 | 1. Rapidly double-click Confirm Booking. | Network tab shows two identical POST `/api/booking/confirm` requests. | Fail |
| TC-039 | Edge | Step 4 | Price total is base * 1.2, rounded to 2 decimal places | API returns price like 123.45 | 1. Verify VAT and total rounding. | VAT is 24.69, Total is 148.14. | Pass |
| TC-040 | Edge | Step 4 | Manual entry address displayed correctly in review | Reached Step 4 via Manual Address | 1. Verify address display. | Shows manually entered Line 1 and City correctly formatted. | Pass |
| TC-041 | API | Step 4 | Confirm API call includes all required fields | Intercepting network on Confirm | 1. Click Confirm Booking. | payload includes `postcode, address, wasteType, plasterboardOption, skipDetails`. | Pass |
| TC-042 | API | Step 4 | Missing required fields returns 400 with missing array | Triggered malformed request to `/api/booking/confirm` | 1. Send manual request missing `wasteType`. | Response is 400 Bad Request with `missing` array. | Pass |
| TC-043 | State | Step 4 | Back from Step 4 preserves skip selection | Reached Step 4 | 1. Click 'Back'. | Step 3 shows previously chosen skip still highlighted. | Pass |
| TC-044 | State | Cross | Full flow state persists across all 4 steps | Mid-flow (Step 3 or 4) | 1. Complete steps 1-3. 2. Verify state context does not drop data. | Data context is 100% persistent through standard forward navigation. | Pass |
| TC-045 | Edge | Cross | Browser back button mid-flow behaves predictably | Reached Step 3 | 1. Click browser native 'Back' button. | Returns to Step 2 with local state intact. | Pass |
| TC-046 | Negative | Step 1 | Whitespace-only postcode "   " shows validation error | App open on Step 1 | 1. Enter "   " in postcode field. 2. Click Find Address. | "Please enter a valid UK postcode" error appears. | Pass |
| TC-047 | Edge | Step 1 | Postcode with extra internal spaces "S W 1 A  1 A A" normalizes | App open on Step 1 | 1. Enter "S W 1 A  1 A A". 2. Click Find Address. | Normalizes to "SW1A 1AA", returns addresses. | Pass |
