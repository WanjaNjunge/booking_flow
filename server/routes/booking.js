import express from 'express';

const router = express.Router();

// Required fields for booking confirmation
const REQUIRED_FIELDS = ['postcode', 'addressId', 'skipSize', 'price'];

// POST /api/booking/confirm
router.post('/booking/confirm', (req, res) => {
  const { postcode, addressId, skipSize, price } = req.body;

  // Validate required fields and types strictly
  const missing = REQUIRED_FIELDS.filter((field) => {
    const val = req.body[field];
    return val === undefined || val === null || val === '';
  });

  if (missing.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields',
      missing,
    });
  }

  // Strict type validation
  if (
    typeof req.body.postcode !== 'string' ||
    typeof req.body.addressId !== 'string' ||
    typeof req.body.skipSize !== 'string' ||
    typeof req.body.price !== 'number' ||
    (req.body.heavyWaste !== undefined && typeof req.body.heavyWaste !== 'boolean') ||
    (req.body.plasterboard !== undefined && typeof req.body.plasterboard !== 'boolean')
  ) {
    return res.status(400).json({
      error: 'Invalid payload schema: incorrect property types',
    });
  }

  // Simulate 1500ms network delay for realistic confirmation UX
  setTimeout(() => {
    res.json({
      status: 'success',
      bookingId: 'BK-' + Date.now(),
    });
  }, 1500);
});

export default router;
