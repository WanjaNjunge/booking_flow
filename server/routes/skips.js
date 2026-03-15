import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const skipsData = require('../fixtures/skips.json');

const router = express.Router();

// Sizes disabled when heavy waste is selected
const HEAVY_WASTE_DISABLED = ['12-yard', '14-yard'];

// GET /api/skips?postcode=SW1A1AA&heavyWaste=true
router.get('/skips', (req, res) => {
  const { heavyWaste } = req.query;
  const isHeavy = heavyWaste === 'true';

  const skips = skipsData.default.map((skip) => ({
    ...skip,
    disabled: isHeavy && HEAVY_WASTE_DISABLED.includes(skip.size)
      ? true
      : skip.disabled,
  }));

  res.json({ skips });
});

export default router;
