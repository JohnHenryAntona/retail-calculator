import { describe, it, expect } from 'vitest'
import { calculateFinalPrice } from '../calculateFinalPrice'

const regionTaxMap = {
  AUK: 0.0685,
  WLG: 0.08,
  WAI: 0.0625,
  CHC: 0.04,
  TAS: 0.0825,
}

describe('calculateFinalPrice', () => {
  it('calculates full breakdown with discount and tax (AUK)', () => {
    const result = calculateFinalPrice(10, 1000, 'AUK', regionTaxMap)
    expect(result.total).toBe(10000)
    expect(result.discountRate).toBe(0.1)
    expect(result.discountAmount).toBe(1000)
    expect(result.discountedTotal).toBe(9000)
    expect(result.taxRate).toBe(0.0685)
    expect(result.taxAmount).toBeCloseTo(616.5)
    expect(result.finalTotal).toBeCloseTo(9616.5)
  })

  it('calculates correctly for lower tier with no discount (WLG)', () => {
    const result = calculateFinalPrice(2, 100, 'WLG', regionTaxMap)
    expect(result.total).toBe(200)
    expect(result.discountRate).toBe(0)
    expect(result.discountAmount).toBe(0)
    expect(result.discountedTotal).toBe(200)
    expect(result.taxRate).toBe(0.08)
    expect(result.taxAmount).toBe(16)
    expect(result.finalTotal).toBe(216)
  })

  it('returns 0s for invalid inputs (NaN quantity)', () => {
    const result = calculateFinalPrice(NaN, 100, 'AUK', regionTaxMap)
    expect(result.total).toBe(0)
    expect(result.finalTotal).toBe(0)
  })

  it('applies correct discount tier and tax for TAS', () => {
    const result = calculateFinalPrice(100, 500, 'TAS', regionTaxMap) // total = 50000
    expect(result.discountRate).toBe(0.15)
    expect(result.taxRate).toBe(0.0825)
    expect(result.discountAmount).toBe(7500)
    expect(result.taxAmount).toBeCloseTo((50000 - 7500) * 0.0825)
  })

  it('uses 0 tax for unknown region code', () => {
    const result = calculateFinalPrice(10, 1000, 'XYZ', regionTaxMap)
    expect(result.taxRate).toBe(0)
    expect(result.taxAmount).toBe(0)
  })
})
