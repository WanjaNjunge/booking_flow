/**
 * Centralized data-testid selector constants.
 * All E2E tests import from here — no hardcoded selectors in specs.
 */
export const SELECTORS = {
  // App
  app: '[data-testid="app"]',
  stepper: '[data-testid="stepper"]',

  // Common states
  loadingState: '[data-testid="loading-state"]',
  errorState: '[data-testid="error-state"]',
  emptyState: '[data-testid="empty-state"]',
  retryButton: '[data-testid="retry-button"]',

  // Step 1 — Postcode
  postcodeLookup: '[data-testid="postcode-lookup"]',
  postcodeInput: '[data-testid="postcode-input"]',
  postcodeLookupButton: '[data-testid="postcode-lookup-button"]',
  addressList: '[data-testid="address-list"]',
  addressOption: '[data-testid="address-option"]',
  manualEntryToggle: '[data-testid="manual-entry-toggle"]',
  manualEntryForm: '[data-testid="manual-entry-form"]',
  manualLine1: '[data-testid="manual-line1"]',
  manualLine2: '[data-testid="manual-line2"]',
  manualCity: '[data-testid="manual-city"]',

  // Step 2 — Waste Type
  wasteTypeSelector: '[data-testid="waste-type-selector"]',
  wasteTypeGeneral: '[data-testid="waste-type-general"]',
  wasteTypeHeavy: '[data-testid="waste-type-heavy"]',
  wasteTypePlasterboard: '[data-testid="waste-type-plasterboard"]',
  plasterboardOptions: '[data-testid="plasterboard-options"]',
  plasterboardMix: '[data-testid="plasterboard-mix"]',
  plasterboardBag: '[data-testid="plasterboard-bag"]',
  plasterboardDedicated: '[data-testid="plasterboard-dedicated"]',

  // Step 3 — Skip Selection
  skipSelector: '[data-testid="skip-selector"]',
  skipCard: '[data-testid="skip-card"]',

  // Step 4 — Review & Confirm
  reviewSummary: '[data-testid="review-summary"]',
  priceBreakdown: '[data-testid="price-breakdown"]',
  confirmBookingButton: '[data-testid="confirm-booking-button"]',
  bookingSuccess: '[data-testid="booking-success"]',
  bookingId: '[data-testid="booking-id"]',

  // Navigation
  nextButton: '[data-testid="next-button"]',
  backButton: '[data-testid="back-button"]',
};
