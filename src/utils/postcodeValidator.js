const UK_POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;

export function isValidPostcode(postcode) {
  if (!postcode || typeof postcode !== 'string') return false;
  return UK_POSTCODE_REGEX.test(postcode.trim());
}

export function normalizePostcode(postcode) {
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
  if (cleaned.length >= 5) {
    return cleaned.slice(0, -3) + ' ' + cleaned.slice(-3);
  }
  return cleaned;
}
