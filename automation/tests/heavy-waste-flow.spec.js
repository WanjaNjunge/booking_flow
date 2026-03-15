import { test, expect } from '@playwright/test';
import { SELECTORS, skipCard, skipCardDisabled, addressOption } from '../helpers/selectors.js';

test.describe('Heavy Waste — Disabled Skip Validation', () => {

  test.beforeEach(async ({ request }) => {
    await request.get('/api/debug/reset-retry');
  });

  test('completes booking with heavy waste, verifies disabled skips', async ({ page }) => {
    // Step 1
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
    await page.locator(addressOption('addr_1')).click();

    // Step 2 — Heavy waste
    await page.locator(SELECTORS.WASTE_TYPE_HEAVY).click();
    await expect(page.locator(SELECTORS.PLASTERBOARD_OPTIONS)).not.toBeVisible();
    await page.locator(SELECTORS.STEP2_CONTINUE).click();

    // Step 3 — Verify disabled skips
    await expect(page.locator(skipCard('4-yard'))).toBeVisible({ timeout: 5000 });

    // 12-yard and 14-yard must show as disabled
    await expect(page.locator(skipCardDisabled('12-yard'))).toBeVisible();
    await expect(page.locator(skipCardDisabled('14-yard'))).toBeVisible();

    // Verify BUG-002: disabled cards are still keyboard focusable
    await page.locator(skipCardDisabled('12-yard')).focus();
    await expect(page.locator(skipCardDisabled('12-yard'))).toBeFocused();

    // Select an enabled skip
    await page.locator(skipCard('8-yard')).click();
    await page.locator(SELECTORS.STEP3_CONTINUE).click();

    // Step 4 — Review
    await expect(page.locator(SELECTORS.REVIEW_WASTE_TYPE)).toContainText('Heavy');
    await expect(page.locator(SELECTORS.REVIEW_SKIP_SIZE)).toContainText('8-yard');

    // Confirm
    await page.locator(SELECTORS.CONFIRM_BUTTON).click();
    await expect(page.locator(SELECTORS.BOOKING_SUCCESS)).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SELECTORS.BOOKING_ID)).toContainText('BK-');
  });

  test('cannot proceed on step 3 without selecting a skip', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
    await page.locator(addressOption('addr_1')).click();
    await page.locator(SELECTORS.WASTE_TYPE_HEAVY).click();
    await page.locator(SELECTORS.STEP2_CONTINUE).click();

    // Try to continue without selecting skip
    await expect(page.locator(skipCard('4-yard'))).toBeVisible({ timeout: 5000 });
    await page.locator(SELECTORS.STEP3_CONTINUE).click();
    await expect(page).not.toHaveURL(/\/step\/4/);
  });
});
