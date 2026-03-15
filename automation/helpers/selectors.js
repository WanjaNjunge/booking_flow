/**
 * Centralized data-testid selector constants.
 * All E2E tests import from here — no hardcoded selectors in specs.
 */
export const SELECTORS = {
  // Stepper
  STEPPER: '[data-testid="stepper"]',
  STEP_1: '[data-testid="step-1"]',
  STEP_2: '[data-testid="step-2"]',
  STEP_3: '[data-testid="step-3"]',
  STEP_4: '[data-testid="step-4"]',

  // Step 1
  POSTCODE_INPUT: '[data-testid="postcode-input"]',
  POSTCODE_SUBMIT: '[data-testid="postcode-submit"]',
  POSTCODE_ERROR: '[data-testid="postcode-error"]',
  ADDRESS_LIST: '[data-testid="address-list"]',
  MANUAL_ENTRY_TOGGLE: '[data-testid="manual-entry-toggle"]',
  MANUAL_ENTRY_FORM: '[data-testid="manual-entry-form"]',
  MANUAL_LINE1: '[data-testid="manual-line1"]',
  MANUAL_LINE2: '[data-testid="manual-line2"]',
  MANUAL_CITY: '[data-testid="manual-city"]',

  // Step 2
  WASTE_TYPE_GENERAL: '[data-testid="waste-type-general"]',
  WASTE_TYPE_HEAVY: '[data-testid="waste-type-heavy"]',
  WASTE_TYPE_PLASTERBOARD: '[data-testid="waste-type-plasterboard"]',
  PLASTERBOARD_OPTIONS: '[data-testid="plasterboard-options-container"]',
  PLASTERBOARD_MIX: '[data-testid="plasterboard-option-mix"]',
  PLASTERBOARD_BAG: '[data-testid="plasterboard-option-bag"]',
  PLASTERBOARD_DEDICATED: '[data-testid="plasterboard-option-dedicated"]',
  WASTE_TYPE_ERROR: '[data-testid="waste-type-error"]',
  STEP2_CONTINUE: '[data-testid="step2-continue"]',
  STEP2_BACK: '[data-testid="step2-back"]',

  // Step 3
  STEP3_CONTINUE: '[data-testid="step3-continue"]',
  STEP3_BACK: '[data-testid="step3-back"]',

  // Step 4
  REVIEW_POSTCODE: '[data-testid="review-postcode"]',
  REVIEW_ADDRESS: '[data-testid="review-address"]',
  REVIEW_WASTE_TYPE: '[data-testid="review-waste-type"]',
  REVIEW_PLASTERBOARD_OPTION: '[data-testid="review-plasterboard-option"]',
  REVIEW_SKIP_SIZE: '[data-testid="review-skip-size"]',
  PRICE_BASE: '[data-testid="price-base"]',
  PRICE_VAT: '[data-testid="price-vat"]',
  PRICE_TOTAL: '[data-testid="price-total"]',
  CONFIRM_BUTTON: '[data-testid="confirm-button"]',
  BOOKING_SUCCESS: '[data-testid="booking-success"]',
  BOOKING_ID: '[data-testid="booking-id"]',
  STEP4_BACK: '[data-testid="step4-back"]',

  // Common
  LOADING_STATE: '[data-testid="loading-state"]',
  ERROR_STATE: '[data-testid="error-state"]',
  RETRY_BUTTON: '[data-testid="retry-button"]',
  ERROR_MESSAGE: '[data-testid="error-message"]',
  EMPTY_STATE: '[data-testid="empty-state"]',
};

// Dynamic selectors
export const skipCard = (size) => `[data-testid="skip-card-${size}"]`;
export const skipCardDisabled = (size) =>
  `[data-testid="skip-card-${size}-disabled"]`;
export const addressOption = (id) =>
  `[data-testid="address-option-${id}"]`;
