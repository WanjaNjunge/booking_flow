/**
 * Format a number as GBP currency.
 * e.g. 120 → "£120.00"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}
