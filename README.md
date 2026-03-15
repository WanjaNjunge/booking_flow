# Booking Flow — QA Assessment

## Overview

A 4-step skip hire booking flow built as a QA Engineering assessment for REM Waste. The application simulates a real-world skip booking process with postcode lookup, waste type selection with branching logic, skip size selection with conditional disabling, and a review/confirmation step with price breakdown. The project includes comprehensive QA deliverables: 45+ manual test cases, 3 automated E2E specs, 3 documented bug reports, Lighthouse audits, and full UI evidence (screenshots + video).

## Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | React 18 + Vite | Fast HMR, modern JSX support, zero-config SPA builds |
| Backend | Express.js + JSON fixtures | Lightweight API layer with deterministic test data — no database needed |
| Testing | Playwright | Cross-browser E2E automation with built-in assertions, auto-wait, and video recording |
| DevOps | Docker + Render.com | Reproducible builds via multi-stage Dockerfile; free-tier hosting with public URL |

## Quick Start

### Option A — Docker (Recommended)

```bash
git clone https://github.com/WanjaNjunge/booking_flow.git
cd booking_flow
docker compose up --build
```

Then open: [http://localhost:3000](http://localhost:3000)

### Option B — Local Dev

```bash
npm install
npx playwright install chromium
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

## Live Demo

[View live demo →](https://booking-flow-qa.onrender.com)

> **Note:** The Render.com free tier may take 30–60 seconds to spin up on first visit.

## Project Structure

```
booking-flow/
├── automation/                  # Playwright E2E test suite
│   ├── helpers/
│   │   └── selectors.js         # Centralised data-testid constants
│   ├── tests/
│   │   ├── general-waste-flow.spec.js
│   │   ├── heavy-waste-flow.spec.js
│   │   └── plasterboard-flow.spec.js
│   └── playwright.config.js     # Playwright configuration
├── server/                      # Express backend
│   ├── fixtures/
│   │   ├── addresses.json       # Deterministic address data
│   │   └── skips.json           # Skip options with pricing
│   ├── routes/
│   │   ├── booking.js           # POST /api/booking/confirm
│   │   ├── debug.js             # GET /api/debug/reset-retry
│   │   ├── postcode.js          # POST /api/postcode/lookup
│   │   ├── skips.js             # GET /api/skips
│   │   └── wasteTypes.js        # POST /api/waste-types
│   └── index.js                 # Express server entry point
├── src/                         # React frontend
│   ├── components/
│   │   ├── common/              # Shared UI: Button, Stepper, Loading, Error, Empty
│   │   ├── step1/               # Postcode lookup + address selection + manual entry
│   │   ├── step2/               # Waste type selector + plasterboard branching
│   │   ├── step3/               # Skip selection with disabled logic
│   │   └── step4/               # Review summary + price breakdown + confirm
│   ├── context/
│   │   └── BookingContext.jsx   # Global booking state (React Context)
│   ├── hooks/
│   │   ├── useApi.js            # Fetch wrapper with loading/error states
│   │   └── useBookingFlow.js    # Step navigation logic
│   ├── utils/
│   │   ├── formatCurrency.js    # £ currency formatter
│   │   └── postcodeValidator.js # UK postcode regex validation
│   ├── App.jsx                  # Root component with step routing
│   ├── index.css                # Global styles
│   └── main.jsx                 # React entry point
├── ui/                          # QA evidence
│   ├── screenshots/
│   │   ├── desktop/             # 12 desktop screenshots
│   │   └── mobile/              # 12 mobile screenshots
│   ├── videos/                  # Flow recording (booking-flow.webm)
│   └── lighthouse/              # Lighthouse performance/accessibility report
├── bug-reports.md               # 3 documented bugs (BUG-001 to BUG-003)
├── manual-tests.md              # 45+ manual test cases
├── CLAUDE.md                    # Project rules and architecture reference
├── STATE.md                     # Session progress tracker
├── Dockerfile                   # Multi-stage build (Vite → Express)
├── docker-compose.yml           # Single-command Docker setup
├── package.json                 # Dependencies and scripts
└── vite.config.js               # Vite configuration
```

## API Reference

| Method | Route | Description | Request Body | Response |
|--------|-------|-------------|-------------|----------|
| POST | `/api/postcode/lookup` | Look up addresses by postcode | `{ "postcode": "SW1A 1AA" }` | `{ "postcode": "...", "addresses": [...] }` |
| POST | `/api/waste-types` | Save waste type selection | `{ "wasteType": "General waste" }` | `{ "ok": true }` |
| GET | `/api/skips?postcode=X&heavyWaste=Y` | Get skip options for postcode | — | `[{ "id", "name", "size", "price", "disabled" }]` |
| POST | `/api/booking/confirm` | Confirm booking | Full booking payload | `{ "bookingId": "...", "status": "confirmed" }` |
| GET | `/health` | Health check | — | `{ "status": "ok", "timestamp": "..." }` |
| GET | `/api/debug/reset-retry` | Reset BS1 4DJ retry counter | — | `{ "ok": true }` |

### Deterministic Fixture Postcodes

| Postcode | Behaviour |
|----------|-----------|
| `SW1A 1AA` | Returns 12 addresses — happy path |
| `EC1A 1BB` | Returns 0 addresses — triggers auto-show manual entry form |
| `M1 1AE` | Simulated ~3 second latency — tests loading states |
| `BS1 4DJ` | Returns 500 on first call, success on retry — tests error handling + retry |

## Test Strategy

### Manual Tests

- **Location:** [manual-tests.md](manual-tests.md)
- **Total cases:** 45+
- **Distribution:**
  - Positive (happy path): 12 cases
  - Negative (invalid input): 12 cases
  - Edge cases: 8 cases
  - API failure/error handling: 6 cases
  - State transition/branching: 7 cases

### Automated E2E Tests

```bash
npm run test:e2e              # run all 3 specs
npx playwright test --ui --config=automation/playwright.config.js  # Playwright UI mode
```

- **3 specs:**
  - `general-waste-flow.spec.js` — Full happy path: SW1A 1AA → address → General waste → skip → confirm
  - `heavy-waste-flow.spec.js` — Heavy waste path: verifies disabled skips, selects enabled skip → confirm
  - `plasterboard-flow.spec.js` — Plasterboard branching: selects handling option → skip → confirm with plasterboard in summary
- **Covers:** Happy paths, error states, retry logic, disabled skip validation, branching logic
- **Selectors:** All tests use centralised `data-testid` constants from `automation/helpers/selectors.js`
- **Mocking strategy:** No mocks — tests run against the real Express API with deterministic JSON fixtures, ensuring identical behaviour between test and production environments

### Bug Reports

- **Location:** [bug-reports.md](bug-reports.md)
- **3 documented bugs:**

| ID | Title | Severity | Location |
|----|-------|----------|----------|
| BUG-001 | Plasterboard option persists after switching to General waste | Medium | `BookingContext.jsx` — `setWasteType()` |
| BUG-002 | Disabled skip cards are keyboard-selectable | High | `SkipCard.jsx` — `disabled` prop not passed to `<button>` |
| BUG-003 | Double-click submits duplicate booking requests | Low | `ConfirmButton.jsx` — `setSubmitting(true)` called after `await` |

## Known Bugs

| ID | Title | Severity | Category |
|----|-------|----------|----------|
| BUG-001 | Plasterboard option persists in booking after switching to General waste | Medium | State transition |
| BUG-002 | Disabled skip cards are keyboard-selectable via Tab + Enter/Space | High | Accessibility |
| BUG-003 | Double-click on Confirm Booking submits duplicate requests | Low | Double submit |

> These bugs are intentionally implemented for the QA assessment. Full reproduction steps, expected vs. actual results, and root cause analysis are documented in [bug-reports.md](bug-reports.md).

## UI/UX Evidence

| Deliverable | Location |
|-------------|----------|
| Desktop screenshots (12) | `ui/screenshots/desktop/` |
| Mobile screenshots (12) | `ui/screenshots/mobile/` |
| Flow video | `ui/videos/booking-flow.webm` |
| Lighthouse report | `ui/lighthouse/report.html` |

Evidence covers: all 4 steps, error states, retry flows, disabled skip visibility, plasterboard branching, price breakdown, and responsive layouts.

## Architecture Decisions

**Why Vite + Express over Next.js**
This project is a client-rendered SPA with a lightweight API. Vite provides instant HMR and sub-second builds without the complexity of SSR, server components, or file-based routing. Express serves the built static files in production and handles the API — a single process that maps cleanly to Docker and Render.com deployment.

**Why deterministic JSON fixtures over a real database**
The QA assessment requires reproducible, predictable test data. JSON fixtures guarantee that `SW1A 1AA` always returns exactly 12 addresses and `BS1 4DJ` always fails on the first attempt. This eliminates database setup, seeding, and state management while making E2E tests fully deterministic.

**Why CSS Modules over a CSS framework**
CSS Modules provide component-scoped styles with zero runtime overhead. Each component (e.g., `Step1.module.css`) has its own namespace, preventing style collisions. This avoids the learning curve and bundle size of a framework like Tailwind while keeping styles co-located with components.

**Why Playwright over Cypress**
Playwright supports multi-browser testing, has native auto-wait functionality (no `cy.wait()` hacks), and provides built-in video recording and screenshot capture. Its `data-testid` locator strategy aligns with the project's architecture rules, and the `webServer` config automatically starts the dev server during test runs.

**Mocking strategy for E2E tests**
Tests run against the real Express API with deterministic fixtures rather than mocking network requests. This tests the full integration path (React → HTTP → Express → JSON → Response) and ensures the tests validate the same code path that runs in production. The `/api/debug/reset-retry` endpoint allows tests to reset server-side state between runs.

## What I Would Do With More Time

- **Unit tests for utilities** — Add Jest/Vitest unit tests for `postcodeValidator.js` and `formatCurrency.js` to cover edge cases (empty input, negative values, non-UK formats)
- **Real postcode API** — Replace fixtures with live lookups via the [postcodes.io](https://postcodes.io) API, with fixture fallback for offline testing
- **Form persistence** — Save booking progress to `localStorage` so users can survive page refresh without losing their selections
- **Improved accessibility** — Fix BUG-002 with a full ARIA disabled pattern (`aria-disabled`, `tabindex="-1"`, `role="button"`) and add keyboard navigation for the stepper
- **CI/CD pipeline** — Add a GitHub Actions workflow: lint → build → E2E tests → deploy to Render on push to `main`
- **Expanded E2E coverage** — Add specs for all 4 fixture postcodes, negative paths (invalid postcode, empty address), and the manual entry flow for `EC1A 1BB`

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Express server port (Render injects this automatically) |
| `NODE_ENV` | `development` | Set to `production` to enable static file serving from `dist/` |

---

*Built by Stephanie as a QA Engineering assessment submission for REM Waste.*
