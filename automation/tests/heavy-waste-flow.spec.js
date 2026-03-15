import { test, expect } from '@playwright/test';
// import { SELECTORS } from '../helpers/selectors.js';

/**
 * E2E: Heavy Waste Flow
 *
 * SW1A 1AA → select address → Heavy waste → verify disabled skips → select enabled skip → confirm
 *
 * TODO: Implement assertions at each step in Session 2
 */

test.beforeEach(async ({ request }) => {
  await request.get('/api/debug/reset-retry');
});

test.describe('Heavy Waste Flow', () => {
  test('should complete a heavy waste booking with disabled skip verification', async ({ page }) => {
    // Step 1: Postcode lookup
    // Step 2: Select Heavy waste
    // Step 3: Assert ≥2 skips disabled, select enabled skip
    // Step 4: Confirm booking
    test.skip(true, 'Placeholder — implementation in Session 2');
  });
});
