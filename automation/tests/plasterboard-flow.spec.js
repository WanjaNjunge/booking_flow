import { test, expect } from '@playwright/test';
// import { SELECTORS } from '../helpers/selectors.js';

/**
 * E2E: Plasterboard Flow
 *
 * SW1A 1AA → select address → Plasterboard → assert 3 options →
 * select "Dedicated plasterboard skip" → select skip →
 * assert summary includes plasterboard option → confirm → assert bookingId
 *
 * TODO: Implement assertions at each step in Session 2
 */

test.beforeEach(async ({ request }) => {
  await request.get('/api/debug/reset-retry');
});

test.describe('Plasterboard Flow', () => {
  test('should complete a plasterboard booking with handling option verification', async ({ page }) => {
    // Step 1: Postcode lookup
    // Step 2: Select Plasterboard, assert 3 options, choose "Dedicated plasterboard skip"
    // Step 3: Select skip
    // Step 4: Assert summary shows plasterboard option, confirm booking
    test.skip(true, 'Placeholder — implementation in Session 2');
  });
});
