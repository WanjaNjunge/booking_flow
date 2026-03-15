# Booking Flow — Skip Hire QA Assessment

A 4-step skip hire booking flow with branching logic, deterministic fixtures, and full QA deliverables.

## Quick Start

```bash
npm install
npm run dev
```

## Docker

```bash
docker compose up --build
```

App runs at [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Frontend:** React 18 + Vite + CSS Modules
- **Backend:** Express.js with JSON fixtures (no database)
- **Testing:** Playwright E2E
- **Deploy:** Docker → Render.com

## Project Structure

```
src/           → React components (4-step form)
server/        → Express API + deterministic fixtures
automation/    → Playwright E2E tests
ui/            → Screenshots, videos, Lighthouse reports
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite + Express) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run test:e2e` | Run Playwright E2E tests |

## Test Data Strategy

All API responses use deterministic JSON fixtures — no database, no randomness.
See `CLAUDE.md` for fixture postcode behaviors.

## Deliverables

- [manual-tests.md](./manual-tests.md) — 35+ test cases
- [bug-reports.md](./bug-reports.md) — 3 documented bugs
- [automation/](./automation/) — 3 Playwright E2E specs
- [ui/](./ui/) — Screenshots, flow video, Lighthouse reports
