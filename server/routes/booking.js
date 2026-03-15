import express from 'express';

const router = express.Router();

// Required fields for booking confirmation
const REQUIRED_FIELDS = ['postcode', 'addressId', 'skipSize', 'price'];

// POST /api/booking/confirm
router.post('/booking/confirm', (req, res) => {
  const { postcode, addressId, skipSize, price } = req.body;

  // Validate required fields
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

  // Simulate 1500ms network delay for realistic confirmation UX
  setTimeout(() => {
    res.json({
      status: 'success',
      bookingId: 'BK-' + Date.now(),
    });
  }, 1500);
});

export default router;
