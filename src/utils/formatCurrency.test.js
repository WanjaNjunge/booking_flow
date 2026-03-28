import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats whole pounds correctly', () => {
    expect(formatCurrency(120)).toBe('£120.00');
  });

  it('formats four-digit amounts with comma separator', () => {
    expect(formatCurrency(1200)).toBe('£1,200.00');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('£0.00');
  });

  it('handles pence correctly', () => {
    expect(formatCurrency(120.5)).toBe('£120.50');
  });
});
