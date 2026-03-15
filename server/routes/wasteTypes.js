import express from 'express';

const router = express.Router();

// POST /api/waste-types
// Always returns 200 OK — purely a state-save step
router.post('/waste-types', (req, res) => {
  const { heavyWaste, plasterboard, plasterboardOption } = req.body;

  console.log('[waste-types] Received:', {
    heavyWaste,
    plasterboard,
    plasterboardOption,
  });

  res.json({ ok: true });
});

export default router;
