import express from 'express';

const router = express.Router();

// POST /api/postcode/lookup
// TODO: Implementation in Session 2
router.post('/postcode/lookup', (_req, res) => {
  res.json({ postcode: '', addresses: [] });
});

export default router;
