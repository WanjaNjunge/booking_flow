import express from 'express';
import { createRequire } from 'module';
import { retryMap } from './debug.js';

const require = createRequire(import.meta.url);
const addresses = require('../fixtures/addresses.json');

const router = express.Router();

// UK postcode regex — matches formats like SW1A 1AA, EC1A 1BB, M1 1AE, etc.
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

// Normalize postcode: uppercase and ensure single space
function normalizePostcode(postcode) {
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
  // Insert space before last 3 chars: "SW1A1AA" → "SW1A 1AA"
  if (cleaned.length >= 5) {
    return cleaned.slice(0, -3) + ' ' + cleaned.slice(-3);
  }
  return cleaned;
}

// POST /api/postcode/lookup
router.post('/postcode/lookup', (req, res) => {
  const { postcode } = req.body;

  if (!postcode || typeof postcode !== 'string') {
    return res.status(400).json({ error: 'Postcode is required' });
  }

  // Validate UK postcode format
  if (!UK_POSTCODE_REGEX.test(postcode.trim())) {
    return res.status(400).json({ error: 'Invalid UK postcode' });
  }

  const normalized = normalizePostcode(postcode);

  // --- Deterministic fixture behaviours ---

  // BS1 4DJ — 500 on first call per IP, success on retry
  if (normalized === 'BS1 4DJ') {
    const clientIp = req.ip;
    if (!retryMap.has(clientIp)) {
      retryMap.set(clientIp, true);
      return res.status(500).json({
        error: 'Internal server error',
        retryable: true,
      });
    }
    // Second+ call — return addresses
    return res.json({
      postcode: normalized,
      addresses: addresses[normalized] || [],
    });
  }

  // M1 1AE — simulated 3s latency
  if (normalized === 'M1 1AE') {
    return setTimeout(() => {
      res.json({
        postcode: normalized,
        addresses: addresses[normalized] || [],
      });
    }, 3000);
  }

  // SW1A 1AA, EC1A 1BB, or any other valid postcode — immediate response
  const result = addresses[normalized] || [];
  return res.json({
    postcode: normalized,
    addresses: result,
  });
});

export default router;
