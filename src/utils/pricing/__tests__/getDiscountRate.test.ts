import { describe, it, expect } from 'vitest'
import { getDiscountRate } from '../getDiscountRate'

describe('getDiscountRate', () => {
  it('returns 0% discount for totals below $1000', () => {
    expect(getDiscountRate(0)).toBe(0)
    expect(getDiscountRate(999.99)).toBe(0)
  })

  it('returns 3% for totals from $1000 to below $5000', () => {
    expect(getDiscountRate(1000)).toBe(0.03)
    expect(getDiscountRate(4999.99)).toBe(0.03)
  })

  it('returns 5% for totals from $5000 to below $7000', () => {
    expect(getDiscountRate(5000)).toBe(0.05)
    expect(getDiscountRate(6999.99)).toBe(0.05)
  })

  it('returns 7% for totals from $7000 to below $10000', () => {
    expect(getDiscountRate(7000)).toBe(0.07)
    expect(getDiscountRate(9999.99)).toBe(0.07)
  })

  it('returns 10% for totals from $10000 to below $50000', () => {
    expect(getDiscountRate(10000)).toBe(0.1)
    expect(getDiscountRate(49999.99)).toBe(0.1)
  })

  it('returns 15% for totals $50000 and above', () => {
    expect(getDiscountRate(50000)).toBe(0.15)
    expect(getDiscountRate(100000)).toBe(0.15)
  })

  it('returns 0 for invalid inputs (NaN, Infinity, negative)', () => {
    expect(getDiscountRate(NaN)).toBe(0)
    expect(getDiscountRate(-100)).toBe(0)
    expect(getDiscountRate(Infinity)).toBe(0)
    expect(getDiscountRate(undefined as any)).toBe(0)
  })
})
