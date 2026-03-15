import { test, expect } from '@playwright/test';
// import { SELECTORS } from '../helpers/selectors.js';

/**
 * E2E: General Waste Flow (Happy Path)
 *
 * SW1A 1AA → select first address → General waste → 4-yard skip → confirm booking
 *
 * TODO: Implement assertions at each step in Session 2
 */

test.beforeEach(async ({ request }) => {
  // Reset retry counter for test isolation
  await request.get('/api/debug/reset-retry');
});

test.describe('General Waste Flow', () => {
  test('should complete a general waste booking end-to-end', async ({ page }) => {
    // Step 1: Postcode lookup
    // Step 2: Select General waste
    // Step 3: Select 4-yard skip
    // Step 4: Confirm booking → assert bookingId
    test.skip(true, 'Placeholder — implementation in Session 2');
  });
});
