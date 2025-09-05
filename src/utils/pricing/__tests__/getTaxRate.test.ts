import { describe, it, expect } from 'vitest'
import { getTaxRate } from '../getTaxRate'

const regionTaxMap = {
  AUK: 0.0685,
  WLG: 0.08,
  WAI: 0.0625,
  CHC: 0.04,
  TAS: 0.0825,
};

describe('getTaxRate', () => {
  it('returns correct tax rate for supported regions', () => {
    expect(getTaxRate('AUK', regionTaxMap)).toBe(0.0685)
    expect(getTaxRate('WLG', regionTaxMap)).toBe(0.08)
    expect(getTaxRate('WAI', regionTaxMap)).toBe(0.0625)
    expect(getTaxRate('CHC', regionTaxMap)).toBe(0.04)
    expect(getTaxRate('TAS', regionTaxMap)).toBe(0.0825)
  })
  
  it('is case-insensitive', () => {
    expect(getTaxRate('auk', regionTaxMap)).toBe(0.0685)
    expect(getTaxRate('wLg', regionTaxMap)).toBe(0.08)
    expect(getTaxRate('ChC', regionTaxMap)).toBe(0.04)
  })
    expect(getTaxRate('TAS', regionTaxMap)).toBe(0.0825)
  it('returns 0 for unknown or invalid region codes', () => {
    expect(getTaxRate('', regionTaxMap)).toBe(0)
    expect(getTaxRate('XYZ', regionTaxMap)).toBe(0)
    expect(getTaxRate(undefined as unknown as string, regionTaxMap)).toBe(0)
    expect(getTaxRate(null as unknown as string, regionTaxMap)).toBe(0)
    expect(getTaxRate('123', regionTaxMap)).toBe(0)
  })
})
