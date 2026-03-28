import { test, expect } from '@playwright/test';
import { SELECTORS, skipCard, skipCardDisabled, addressOption } from '../helpers/selectors.js';

function nextWeekday() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

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

    // BUG-002 FIX: disabled cards must NOT be keyboard-selectable (button has disabled attr)
    const disabledCard = page.locator(skipCardDisabled('12-yard'));
    await expect(disabledCard).toBeDisabled();

    // Select an enabled skip
    await page.locator(skipCard('8-yard')).click();
    await page.locator(SELECTORS.STEP3_CONTINUE).click();

    // Step 4 — Review
    await expect(page.locator(SELECTORS.REVIEW_WASTE_TYPE)).toContainText('Heavy');
    await expect(page.locator(SELECTORS.REVIEW_SKIP_SIZE)).toContainText('8-yard');

    // Fill required fields
    await page.locator(SELECTORS.CONTACT_EMAIL).fill('test@example.com');
    await page.locator(SELECTORS.DELIVERY_DATE_INPUT).fill(nextWeekday());
    await page.locator(SELECTORS.TERMS_CHECKBOX).check();

    // Confirm
    await page.locator(SELECTORS.CONFIRM_BUTTON).click();
    await expect(page.locator(SELECTORS.BOOKING_SUCCESS)).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SELECTORS.BOOKING_ID)).toContainText('BK-');
  });

  test('should keep Confirm button disabled until terms are checked', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
    await page.locator(addressOption('addr_1')).click();
    await page.locator(SELECTORS.WASTE_TYPE_HEAVY).click();
    await page.locator(SELECTORS.STEP2_CONTINUE).click();
    await expect(page.locator(skipCard('8-yard'))).toBeVisible({ timeout: 5000 });
    await page.locator(skipCard('8-yard')).click();
    await page.locator(SELECTORS.STEP3_CONTINUE).click();

    // Fill email and date but NOT terms
    await page.locator(SELECTORS.CONTACT_EMAIL).fill('test@example.com');
    await page.locator(SELECTORS.DELIVERY_DATE_INPUT).fill(nextWeekday());

    // Confirm button should remain disabled
    await expect(page.locator(SELECTORS.CONFIRM_BUTTON)).toBeDisabled();

    // Check terms — button should now enable
    await page.locator(SELECTORS.TERMS_CHECKBOX).check();
    await expect(page.locator(SELECTORS.CONFIRM_BUTTON)).toBeEnabled();
  });

  test('cannot proceed on step 3 without selecting a skip', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
    await page.locator(addressOption('addr_1')).click();
    await page.locator(SELECTORS.WASTE_TYPE_HEAVY).click();
    await page.locator(SELECTORS.STEP2_CONTINUE).click();

    // Cannot continue without selecting skip
    await expect(page.locator(skipCard('4-yard'))).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SELECTORS.STEP3_CONTINUE)).toBeDisabled();
  });
});
