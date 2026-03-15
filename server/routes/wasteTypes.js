import express from 'express';

const router = express.Router();

// POST /api/waste-types
// Always returns 200 OK — state-save only
router.post('/waste-types', (_req, res) => {
  res.json({ ok: true });
});

export default router;
