import express from 'express';

const router = express.Router();

// POST /api/booking/confirm
// TODO: Implementation in Session 2
router.post('/booking/confirm', (_req, res) => {
  res.json({ status: 'success', bookingId: 'BK-00000' });
});

export default router;
