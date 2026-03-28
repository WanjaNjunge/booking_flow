import { test, expect } from '@playwright/test';
import { SELECTORS, skipCard, skipCardDisabled, addressOption } from '../helpers/selectors.js';

/** Returns tomorrow's date (or the next weekday) as YYYY-MM-DD local string */
function nextWeekday() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Fill Step 4 required fields and confirm */
async function fillStep4AndConfirm(page) {
  await page.locator(SELECTORS.CONTACT_EMAIL).fill('test@example.com');
  await page.locator(SELECTORS.DELIVERY_DATE_INPUT).fill(nextWeekday());
  await page.locator(SELECTORS.TERMS_CHECKBOX).check();
  await page.locator(SELECTORS.CONFIRM_BUTTON).click();
}

test.describe('General Waste — Happy Path', () => {

  test.beforeEach(async ({ request }) => {
    await request.get('/api/debug/reset-retry');
  });

  test('completes full booking with general waste and 4-yard skip', async ({ page }) => {
    // Step 1 — Postcode
    await page.goto('/');
    await expect(page.locator(SELECTORS.STEPPER)).toBeVisible();
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });

    // Select first address
    await page.locator(addressOption('addr_1')).click();
    await expect(page).toHaveURL(/\/step\/2/);

    // Step 2 — Waste type
    await page.locator(SELECTORS.WASTE_TYPE_GENERAL).click();
    await expect(page.locator(SELECTORS.PLASTERBOARD_OPTIONS)).not.toBeVisible();
    await page.locator(SELECTORS.STEP2_CONTINUE).click();
    await expect(page).toHaveURL(/\/step\/3/);

    // Step 3 — Skip selection
    await expect(page.locator(skipCard('4-yard'))).toBeVisible({ timeout: 5000 });

    // Verify all 8 skips present
    const allSkips = ['2-yard', '4-yard', '6-yard', '8-yard', '10-yard', '12-yard', '14-yard', '16-yard'];
    for (const size of allSkips) {
      const card = page.locator(
        `[data-testid="skip-card-${size}"], [data-testid="skip-card-${size}-disabled"]`
      );
      await expect(card).toBeVisible();
    }

    // 12-yard and 14-yard NOT disabled for general waste
    await expect(page.locator(skipCardDisabled('12-yard'))).not.toBeVisible();
    await expect(page.locator(skipCardDisabled('14-yard'))).not.toBeVisible();

    // Select 4-yard skip
    await page.locator(skipCard('4-yard')).click();
    await page.locator(SELECTORS.STEP3_CONTINUE).click();
    await expect(page).toHaveURL(/\/step\/4/);

    // Step 4 — Review
    await expect(page.locator(SELECTORS.REVIEW_POSTCODE)).toContainText('SW1A 1AA');
    await expect(page.locator(SELECTORS.REVIEW_WASTE_TYPE)).toContainText('General');
    await expect(page.locator(SELECTORS.REVIEW_SKIP_SIZE)).toContainText('4-yard');

    // Price breakdown
    await expect(page.locator(SELECTORS.PRICE_BASE)).toContainText('£120');
    await expect(page.locator(SELECTORS.PRICE_VAT)).toContainText('£24');
    await expect(page.locator(SELECTORS.PRICE_TOTAL)).toContainText('£144');

    // Fill Step 4 fields and confirm
    await fillStep4AndConfirm(page);
    await expect(page.locator(SELECTORS.BOOKING_SUCCESS)).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SELECTORS.BOOKING_ID)).toContainText('BK-');
  });

  test('shows Start New Booking after successful confirmation', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
    await page.locator(addressOption('addr_1')).click();
    await page.locator(SELECTORS.WASTE_TYPE_GENERAL).click();
    await page.locator(SELECTORS.STEP2_CONTINUE).click();
    await expect(page.locator(skipCard('4-yard'))).toBeVisible({ timeout: 5000 });
    await page.locator(skipCard('4-yard')).click();
    await page.locator(SELECTORS.STEP3_CONTINUE).click();

    await fillStep4AndConfirm(page);
    await expect(page.locator(SELECTORS.BOOKING_SUCCESS)).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SELECTORS.START_NEW_BOOKING)).toBeVisible();

    // Clicking Start New Booking navigates back to Step 1
    await page.locator(SELECTORS.START_NEW_BOOKING).click();
    await expect(page).toHaveURL(/\/step\/1/);
    await expect(page.locator(SELECTORS.POSTCODE_INPUT)).toBeVisible();
  });

  test('should allow navigation back via Stepper to a completed step', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
    await page.locator(addressOption('addr_1')).click();
    await expect(page).toHaveURL(/\/step\/2/);

    // Step 1 should now be a clickable button in the stepper
    await page.locator(SELECTORS.STEP_1).click();
    await expect(page).toHaveURL(/\/step\/1/);
    await expect(page.locator(SELECTORS.POSTCODE_INPUT)).toBeVisible();
  });

  test('shows error and retries successfully for BS1 4DJ', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('BS1 4DJ');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();

    // First call — error state
    await expect(page.locator(SELECTORS.ERROR_STATE)).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SELECTORS.RETRY_BUTTON)).toBeVisible();

    // Retry — success
    await page.locator(SELECTORS.RETRY_BUTTON).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
  });

  test('shows manual entry for EC1A 1BB', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('EC1A 1BB');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();

    await expect(page.locator(SELECTORS.MANUAL_ENTRY_FORM)).toBeVisible({ timeout: 5000 });

    // Complete manual entry
    await page.locator(SELECTORS.MANUAL_LINE1).fill('123 Test Street');
    await page.locator(SELECTORS.MANUAL_CITY).fill('London');
    await page.getByRole('button', { name: /use this address/i }).click();
    await expect(page).toHaveURL(/\/step\/2/);
  });

  test('shows loading state for M1 1AE with ~3s delay', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('M1 1AE');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();

    await expect(page.locator(SELECTORS.LOADING_STATE)).toBeVisible();
    // Spinner remains visible for at least 2s
    await page.waitForTimeout(2000);
    await expect(page.locator(SELECTORS.LOADING_STATE)).toBeVisible();
    // Then resolves
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
  });

  test('rejects invalid postcode format', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('INVALID');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.POSTCODE_ERROR)).toBeVisible();
    await expect(page).toHaveURL(/step\/1|\/$/);
  });
});
