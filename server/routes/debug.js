import express from 'express';

const router = express.Router();

// In-memory retry tracker keyed by IP address
// Used by BS1 4DJ fixture behaviour in postcode route
const retryMap = new Map();

// GET /api/debug/reset-retry — clears retry map (used by Playwright beforeEach)
router.get('/debug/reset-retry', (_req, res) => {
  retryMap.clear();
  res.json({ reset: true });
});

export { retryMap };
export default router;
