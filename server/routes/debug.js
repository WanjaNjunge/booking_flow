import express from 'express';

const router = express.Router();

// In-memory retry counter keyed by IP
const retryMap = new Map();

// GET /api/debug/reset-retry — clears retry map (used by Playwright beforeEach)
router.get('/debug/reset-retry', (_req, res) => {
  retryMap.clear();
  res.json({ ok: true, message: 'Retry counters cleared' });
});

// Export retryMap so postcode route can use it
export { retryMap };
export default router;
