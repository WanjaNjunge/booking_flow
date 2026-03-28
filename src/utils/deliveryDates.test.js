import { describe, it, expect } from 'vitest';
import { getAvailableDates, formatDeliveryDate } from './deliveryDates';

describe('getAvailableDates', () => {
  // Use a fixed Monday as "today" so results are deterministic
  const MONDAY = new Date(2026, 2, 23); // Monday 23 March 2026

  it('returns exactly 10 entries (14 calendar days minus weekends)', () => {
    const dates = getAvailableDates(MONDAY);
    // 14 calendar days starting from Tuesday 24 March to Wednesday 8 April
    // weekends: Sat 28, Sun 29, Sat 4, Sun 5 April = 4 weekend days
    expect(dates).toHaveLength(10);
  });

  it('first entry is tomorrow (not today)', () => {
    const dates = getAvailableDates(MONDAY);
    expect(dates[0]).toBe('2026-03-24'); // Tuesday
  });

  it('last entry is within 14 days of today', () => {
    const dates = getAvailableDates(MONDAY);
    const lastIso = dates[dates.length - 1];
    // Build maxDate as ISO string (YYYY-MM-DD) for locale-safe comparison
    const maxDate = new Date(MONDAY);
    maxDate.setDate(maxDate.getDate() + 14);
    const maxIso = [
      maxDate.getFullYear(),
      String(maxDate.getMonth() + 1).padStart(2, '0'),
      String(maxDate.getDate()).padStart(2, '0'),
    ].join('-');
    expect(lastIso <= maxIso).toBe(true);
  });

  it('contains no Saturdays (day 6)', () => {
    const dates = getAvailableDates(MONDAY);
    for (const d of dates) {
      const [y, m, day] = d.split('-').map(Number);
      const date = new Date(y, m - 1, day);
      expect(date.getDay()).not.toBe(6);
    }
  });

  it('contains no Sundays (day 0)', () => {
    const dates = getAvailableDates(MONDAY);
    for (const d of dates) {
      const [y, m, day] = d.split('-').map(Number);
      const date = new Date(y, m - 1, day);
      expect(date.getDay()).not.toBe(0);
    }
  });
});

describe('formatDeliveryDate', () => {
  it('formats an ISO date string to a readable format', () => {
    expect(formatDeliveryDate('2026-03-24')).toBe('Tuesday 24 March 2026');
  });

  it('returns empty string for null', () => {
    expect(formatDeliveryDate(null)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(formatDeliveryDate('')).toBe('');
  });
});
