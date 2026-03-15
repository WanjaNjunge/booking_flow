import express from 'express';

const router = express.Router();

// GET /api/skips?postcode=X&heavyWaste=Y
// TODO: Implementation in Session 2
router.get('/skips', (_req, res) => {
  res.json({ skips: [] });
});

export default router;
