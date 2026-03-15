# CLAUDE.md — Booking Flow QA Assessment

## Project Overview
A 4-step skip hire booking flow with branching logic, deterministic fixtures, and full QA deliverables.
Built as a QA assessment submission demonstrating functional correctness, product realism, testing depth, and accessibility.

## Tech Stack
- Frontend: React 18 + Vite + CSS Modules
- Backend: Express.js with JSON fixtures (no DB)
- Testing: Playwright (E2E)
- Deploy: Docker → Render.com (free tier, public URL, no expiry)

## Key Commands
- `npm install` — install all dependencies
- `npm run dev` — start dev server (Vite + Express concurrently)
- `npm run build` — production build
- `npm run start` — serve production build via Express (serves dist/ + API)
- `npm run test:e2e` — run all 3 Playwright E2E specs
- `docker compose up --build` — run via Docker

## Architecture Rules
1. All interactive elements MUST have `data-testid` attributes
2. Components should be ≤150 lines; extract sub-components when larger
3. Every async step must handle 3 UI states: loading, error, empty
4. API routes must exactly match the contract in the spec
5. Fixtures are deterministic — never randomize test data
6. Express uses `process.env.PORT || 3000` (Render injects PORT)

## API Contract
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/postcode/lookup | Postcode → addresses |
| POST | /api/waste-types | Waste type state save (always 200 OK) |
| GET | /api/skips?postcode=X&heavyWaste=Y | Skip options |
| POST | /api/booking/confirm | Confirm booking → bookingId |
| GET | /health | Health check → { "status": "ok" } |
| GET | /api/debug/reset-retry | Reset BS1 4DJ retry counter (test use) |

## Fixture Postcodes
| Postcode | Behavior |
|----------|----------|
| SW1A 1AA | 12+ addresses |
| EC1A 1BB | 0 addresses → auto-show manual entry form |
| M1 1AE | Simulated 3s latency |
| BS1 4DJ | 500 on first call per IP, success on retry. Counter reset via GET /api/debug/reset-retry |

## Step 1 — Manual Entry Rules
- 0 addresses returned → auto-render manual entry form (no click required)
- Addresses exist → show address list + "Enter address manually instead" link below
- Manual entry fields: Line 1 (required), Line 2 (optional), City (required)
- Both paths populate the same BookingContext address field
- Required data-testid values: manual-entry-toggle, manual-entry-form, manual-line1, manual-line2, manual-city

## Step 2 — Waste Type & Plasterboard
- Waste type options: General waste, Heavy waste, Plasterboard
- Plasterboard shows 3 handling options:
  1. "Mix with general waste"
  2. "Bag separately"
  3. "Dedicated plasterboard skip"
- POST /api/waste-types always returns 200 { "ok": true }

## Step 3 — Skip Selection
- Postcode normalized (spaces removed) for query string: "SW1A 1AA" → ?postcode=SW1A1AA
- Heavy waste disables at least 2 skip sizes
- At least 8 skip options with mixed enabled/disabled states
- Disabled skips are visually greyed out

## Step 4 — Review & Confirm
- Price breakdown: Base skip price + VAT (20%) + Total
- Prevent double submit

## Deployment (Render.com)
- Single Express process serves dist/ static files + API
- SPA catch-all: all non-API routes → dist/index.html
- Dockerfile: multi-stage build (Stage 1: Vite build, Stage 2: Express + dist)
- docker-compose.yml: port 3000:3000, NODE_ENV=production
- GET /health endpoint for Render health checks

## Automation (Playwright — 3 Specs)
1. `general-waste-flow.spec.js` — SW1A 1AA → address → General waste → skip → confirm
2. `heavy-waste-flow.spec.js` — SW1A 1AA → address → Heavy waste → verify disabled skips → select enabled → confirm
3. `plasterboard-flow.spec.js` — SW1A 1AA → address → Plasterboard → "Dedicated plasterboard skip" → skip → confirm with plasterboard option in summary
- All selector constants centralized in `automation/helpers/selectors.js`
- data-testid selectors only — no CSS/XPath
- Each spec calls GET /api/debug/reset-retry in beforeEach

## Intentional Bugs (for bug-reports.md)
These are deliberately implemented. Do NOT flag in code comments.

BUG-001 | Medium | Branching + State Transition
  Selecting Plasterboard → choosing handling option → going back to Step 2 → switching to General waste
  does NOT clear plasterboardOption from BookingContext. It's silently submitted.
  Root cause: plasterboardOption not cleared when waste type changes.

BUG-002 | High | Accessibility + Disabled Logic
  Disabled skip cards are visually greyed out but remain keyboard-focusable and selectable via Enter/Space.
  Root cause: disabled prop not passed to <button>, only CSS class applied.

BUG-003 | Low | Double Submit
  On Step 4, clicking "Confirm Booking" during slow network allows a second click before button disables.
  Root cause: setSubmitting(true) called after await resolves, not before.

## Session Protocol
- Read STATE.md before starting any task
- Update STATE.md after every completed task
- Never start a new session without checking STATE.md first
