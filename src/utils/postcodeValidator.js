/**
 * UK postcode regex validation.
 * Implementation to be completed in Session 2.
 */
export function isValidPostcode(postcode) {
  // TODO: UK postcode regex
  return typeof postcode === 'string' && postcode.trim().length > 0;
}

/**
 * Normalize postcode by removing spaces.
 * e.g. "SW1A 1AA" → "SW1A1AA"
 */
export function normalizePostcode(postcode) {
  return postcode.replace(/\s+/g, '').toUpperCase();
}
