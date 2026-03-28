import { test, expect } from '@playwright/test';
import { SELECTORS, skipCard, addressOption } from '../helpers/selectors.js';

function nextWeekday() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

test.describe('Plasterboard — Branching Logic', () => {

  test.beforeEach(async ({ request }) => {
    await request.get('/api/debug/reset-retry');
  });

  test('completes full plasterboard flow with dedicated skip option', async ({ page }) => {
    // Step 1
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
    await page.locator(addressOption('addr_1')).click();

    // Step 2 — Plasterboard
    await page.locator(SELECTORS.WASTE_TYPE_PLASTERBOARD).click();
    await expect(page.locator(SELECTORS.PLASTERBOARD_OPTIONS)).toBeVisible();

    // All 3 options visible
    await expect(page.locator(SELECTORS.PLASTERBOARD_MIX)).toBeVisible();
    await expect(page.locator(SELECTORS.PLASTERBOARD_BAG)).toBeVisible();
    await expect(page.locator(SELECTORS.PLASTERBOARD_DEDICATED)).toBeVisible();

    // Cannot continue without selecting option
    await page.locator(SELECTORS.STEP2_CONTINUE).click();
    await expect(page.locator(SELECTORS.WASTE_TYPE_ERROR)).toBeVisible();
    await expect(page).toHaveURL(/\/step\/2/);

    // Select dedicated option
    await page.locator(SELECTORS.PLASTERBOARD_DEDICATED).click();
    await page.locator(SELECTORS.STEP2_CONTINUE).click();
    await expect(page).toHaveURL(/\/step\/3/);

    // Step 3
    await expect(page.locator(skipCard('4-yard'))).toBeVisible({ timeout: 5000 });
    await page.locator(skipCard('6-yard')).click();
    await page.locator(SELECTORS.STEP3_CONTINUE).click();

    // Step 4 — Review shows plasterboard option
    await expect(page.locator(SELECTORS.REVIEW_WASTE_TYPE)).toContainText('Plasterboard');
    await expect(page.locator(SELECTORS.REVIEW_PLASTERBOARD_OPTION))
      .toContainText('Dedicated plasterboard skip');

    // Fill required fields and confirm
    await page.locator(SELECTORS.CONTACT_EMAIL).fill('test@example.com');
    await page.locator(SELECTORS.DELIVERY_DATE_INPUT).fill(nextWeekday());
    await page.locator(SELECTORS.TERMS_CHECKBOX).check();
    await page.locator(SELECTORS.CONFIRM_BUTTON).click();
    await expect(page.locator(SELECTORS.BOOKING_SUCCESS)).toBeVisible({ timeout: 5000 });
  });

  test('BUG-001 fixed: plasterboard option is cleared when switching to general waste', async ({ page }) => {
    await page.goto('/');
    await page.locator(SELECTORS.POSTCODE_INPUT).fill('SW1A 1AA');
    await page.locator(SELECTORS.POSTCODE_SUBMIT).click();
    await expect(page.locator(SELECTORS.ADDRESS_LIST)).toBeVisible({ timeout: 5000 });
    await page.locator(addressOption('addr_1')).click();

    // Select plasterboard + option
    await page.locator(SELECTORS.WASTE_TYPE_PLASTERBOARD).click();
    await page.locator(SELECTORS.PLASTERBOARD_BAG).click();

    // Switch to general waste — plasterboardOption must be cleared
    await page.locator(SELECTORS.WASTE_TYPE_GENERAL).click();
    await expect(page.locator(SELECTORS.PLASTERBOARD_OPTIONS)).not.toBeVisible();
    await page.locator(SELECTORS.STEP2_CONTINUE).click();

    // Skip step
    await expect(page.locator(skipCard('4-yard'))).toBeVisible({ timeout: 5000 });
    await page.locator(skipCard('4-yard')).click();
    await page.locator(SELECTORS.STEP3_CONTINUE).click();

    // BUG-001 FIXED: plasterboard option must NOT appear in review
    await expect(page.locator(SELECTORS.REVIEW_PLASTERBOARD_OPTION)).not.toBeVisible();
  });
});
