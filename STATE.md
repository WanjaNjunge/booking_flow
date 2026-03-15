# Booking Flow — Project State

## Project
- **Name:** Booking Flow QA Assessment
- **Candidate:** Stephanie
- **Role Applied:** QA Engineer (Process Owner) — REM Waste
- **Stack:** React 18 + Vite + Express + Playwright + Docker
- **Deployment Target:** Render.com

---

## Session Log

### Session 1 — Scaffold ✅
- CLAUDE.md, bug-reports.md, .gitignore created
- 45+ placeholder files scaffolded
- npm install, npm run dev verified
- Commits: `chore: initial project setup`,
  `scaffold: project structure and config`

### Session 2 — Backend API ✅
- All 6 server files implemented
- All 13 API curl tests passed
- Express on port 3001 (dev) / 3000 (prod)
- All 4 fixture postcodes working
- Commit: `feat(api): implement all backend routes
  with deterministic fixtures`

### Session 3 — Frontend ✅
- 26 files, 1648 insertions
- BookingContext, useApi, App, Stepper implemented
- All common components: Loading, Error, Empty, Button
- Steps 1–4 fully implemented with CSS modules
- All 6 manual browser flows verified
- BUG-001, BUG-002, BUG-003 confirmed present
- Commit: `feat(frontend): implement Steps 1-4
  with full state management`

### Session 4 — QA Deliverables ✅
- selectors.js fully populated
- 3 E2E specs passing (general, heavy, plasterboard)
- 45+ manual test cases in manual-tests.md
- All 3 bug reports completed in bug-reports.md
- Lighthouse report saved to ui/lighthouse/
- 12 desktop + 12 mobile screenshots saved
- Flow video saved to ui/videos/
- Commit: `feat(qa): E2E automation, manual tests,
  bug reports, Lighthouse, screenshots`

---

## Current Session
**Session 5 — README, Docker, Render Deployment**
**Status:** Not started
**Goal:** Write README.md, verify Docker build,
  deploy to Render.com, final submission prep

---

## Remaining Sessions

| Session | Goal | Status |
|---|---|---|
| 5 | README, Docker, Render deployment | 🔲 Not started |

---

## Intentional Bugs

| ID | Location | Description | Status |
|---|---|---|---|
| BUG-001 | BookingContext.jsx `setWasteType()` | plasterboardOption not cleared on waste type change | ✅ Present |
| BUG-002 | SkipCard.jsx | disabled prop not passed to `<button>` — keyboard accessible | ✅ Present |
| BUG-003 | ConfirmButton.jsx | `setSubmitting(true)` called after `await` — double submit window | ✅ Present |

---

## Deterministic Fixtures

| Postcode | Behaviour | Verified |
|---|---|---|
| SW1A 1AA | 12 addresses | ✅ |
| EC1A 1BB | 0 addresses — empty state | ✅ |
| M1 1AE | ~3s simulated latency | ✅ |
| BS1 4DJ | 500 on first call, success on retry | ✅ |

---

## API Routes

| Method | Route | Status |
|---|---|---|
| POST | /api/postcode/lookup | ✅ |
| POST | /api/waste-types | ✅ |
| GET | /api/skips | ✅ |
| POST | /api/booking/confirm | ✅ |
| GET | /health | ✅ |
| GET | /api/debug/reset-retry | ✅ |

---

## Submission Checklist

| Item | Status |
|---|---|
| Public demo link (Render.com) | 🔲 Pending |
| Docker — `docker compose up` works | 🔲 Pending |
| README.md complete | 🔲 Pending |
| manual-tests.md — 45+ cases | ✅ |
| bug-reports.md — 3 bugs | ✅ |
| automation/ — 3 E2E specs passing | ✅ |
| ui/ — screenshots + video + Lighthouse | ✅ |
| Git repo — public | 🔲 Pending |

---

## Git Log

1. `chore: initial project setup`
2. `scaffold: project structure and config`
3. `feat(api): implement all backend routes with deterministic fixtures`
4. `feat(frontend): implement Steps 1-4 with full state management`
5. `feat(qa): E2E automation, manual tests, bug reports,
    Lighthouse, screenshots`

---

## Open Issues
None.

---

## Notes
- Render.com account: ⏳ manual action required by Stephanie
- GitHub repo must be public before Render deployment
- Demo link must have no login, VPN, or expiry

---

*Last updated: Session 4 complete*
