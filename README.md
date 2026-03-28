# Skip Hire Booking Flow

A 4-step skip hire booking flow demonstrating full-stack engineering and QA methodology.

[![CI](https://github.com/WanjaNjunge/booking_flow/actions/workflows/ci.yml/badge.svg)](https://github.com/WanjaNjunge/booking_flow/actions/workflows/ci.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://booking-flow-0jfo.onrender.com)

---

## Architecture

```
Browser
  └── React 18 SPA (Vite)
        ├── Step 1: Postcode / Address Lookup
        ├── Step 2: Waste Type (+ Plasterboard branching)
        ├── Step 3: Skip Size Selection
        └── Step 4: Contact + Delivery Date + Confirm
              └── Express.js REST API
                    └── JSON Fixtures (deterministic test data)
```

State is managed via React Context with sessionStorage persistence — a browser refresh restores in-progress bookings.

---

## What This Demonstrates

**Full-stack architecture**
- React 18 Context + hooks (`useApi`, `useBooking`) for state and async data fetching
- Express.js REST API with deterministic JSON fixtures; no database required
- SPA routing with react-router-dom; Express catch-all for production builds

**Test strategy**
- Vitest unit tests for pure functions and hooks with V8 coverage
- Playwright E2E tests covering 3 complete user flows
- Manual test matrix: 47 cases across positive, negative, edge, and API-failure categories
- See [TESTING_STRATEGY.md](TESTING_STRATEGY.md) for the full rationale

**QA methodology**
- 3 defects documented with severity, root cause, reproduction steps, and fix — see [bug-reports.md](bug-reports.md)
- Regression tests updated to assert corrected behaviour after each fix
- Defect lifecycle: surfaced during exploratory testing → documented → fixed → regression-tested

**Accessibility**
- BUG-002 fix: `disabled={disabled}` passed to `<button>` elements (WCAG 2.1 SC 2.1.1 — Keyboard)
- ARIA labels on skip cards: enabled and disabled states
- Clickable stepper with `aria-label="Go to step N: [name]"` on completed steps
- All interactive elements have `data-testid` attributes

**DevOps**
- Multi-stage Dockerfile: Stage 1 builds the Vite SPA; Stage 2 runs Express serving `dist/`
- GitHub Actions CI: unit tests (with lcov coverage artifact) → E2E tests (Chromium)
- Deployed on Render.com free tier with `GET /health` endpoint

---

## Fixture Postcodes

| Postcode | Behaviour |
|----------|-----------|
| `SW1A 1AA` | 12 addresses — happy path |
| `EC1A 1BB` | 0 addresses — auto-renders manual entry form |
| `M1 1AE` | Simulated 3s latency — tests loading state |
| `BS1 4DJ` | 500 on first call, 200 on retry — tests error + retry flow |

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Testing

**Unit tests (Vitest)**
```bash
npm run test:unit:coverage
# Coverage report written to coverage/lcov.info
```

**E2E tests (Playwright)**
```bash
npx playwright install chromium   # first time only
npm run test:e2e
```

---

## Docker

```bash
docker compose up --build
# → http://localhost:3000
```

---

## Live Demo

[https://booking-flow-0jfo.onrender.com](https://booking-flow-0jfo.onrender.com)

> Free tier — allow ~30s on first visit for cold start.

---

## Project Structure

```
booking-flow/
├── .github/workflows/ci.yml        # GitHub Actions: unit → E2E
├── automation/
│   ├── helpers/selectors.js         # Centralised data-testid constants
│   └── tests/                       # 3 Playwright specs
├── server/
│   ├── fixtures/                    # addresses.json, skips.json
│   └── routes/                      # booking, skips, postcode, debug
├── src/
│   ├── components/
│   │   ├── common/                  # Stepper (clickable), Button, Loading, Error, Empty
│   │   ├── step1/                   # Postcode lookup + address list + manual entry
│   │   ├── step2/                   # Waste type + plasterboard branching
│   │   ├── step3/                   # Skip selection (disabled logic + ARIA)
│   │   └── step4/                   # ContactInfo, DeliveryDatePicker, ConfirmButton, ReviewSummary
│   ├── context/BookingContext.jsx   # Global state + sessionStorage persistence
│   ├── hooks/useApi.js              # Fetch wrapper (loading / error / retry)
│   └── utils/
│       ├── deliveryDates.js         # Weekday-only date generation (unit-tested)
│       ├── formatCurrency.js        # GBP formatter
│       └── postcodeValidator.js     # UK postcode regex + normalisation
├── bug-reports.md                   # BUG-001/002/003 — documented, triaged, fixed
├── manual-tests.md                  # 47 manual test cases
├── TESTING_STRATEGY.md              # Test pyramid, rationale, known gaps
├── Dockerfile                       # Multi-stage build
├── docker-compose.yml
└── vitest.config.js                 # jsdom environment, V8 coverage
```

---

## API Contract

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/postcode/lookup` | Postcode → addresses |
| POST | `/api/waste-types` | Waste type save (always 200) |
| GET | `/api/skips?postcode=X&heavyWaste=Y` | Skip options |
| POST | `/api/booking/confirm` | Confirm → bookingId |
| GET | `/health` | Health check |
| GET | `/api/debug/reset-retry` | Reset BS1 4DJ retry counter |
