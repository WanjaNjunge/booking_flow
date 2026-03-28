import { describe, it, expect } from 'vitest';
import { isValidPostcode, normalizePostcode } from './postcodeValidator';

describe('isValidPostcode', () => {
  it.each([
    ['SW1A 1AA'],
    ['EC1A1BB'],
    ['M1 1AE'],
    ['BS1 4DJ'],
    ['W1A 0AX'],
  ])('accepts valid UK postcode: %s', (postcode) => {
    expect(isValidPostcode(postcode)).toBe(true);
  });

  it.each([
    ['INVALID'],
    ['12345'],
    ['SW1A'],
    [''],
    [null],
  ])('rejects invalid postcode: %s', (postcode) => {
    expect(isValidPostcode(postcode)).toBe(false);
  });
});

describe('normalizePostcode', () => {
  it('strips spaces and uppercases', () => {
    expect(normalizePostcode('sw1a 1aa')).toBe('SW1A 1AA');
  });

  it('inserts space before last 3 characters when missing', () => {
    expect(normalizePostcode('EC1A1BB')).toBe('EC1A 1BB');
  });

  it('handles already-normalised postcodes', () => {
    expect(normalizePostcode('BS1 4DJ')).toBe('BS1 4DJ');
  });

  it('handles extra whitespace', () => {
    expect(normalizePostcode('  M1  1AE  ')).toBe('M1 1AE');
  });
});
