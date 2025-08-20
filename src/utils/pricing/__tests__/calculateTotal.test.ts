import { describe, it, expect } from 'vitest'
import { calculateTotal } from '../calculateTotal'

describe('calculateTotal', () => {
  it('returns correct total for valid input', () => {
    expect(calculateTotal(2, 5)).toBe(10)
    expect(calculateTotal(10, 100)).toBe(1000)
    expect(calculateTotal(0, 100)).toBe(0)
    expect(calculateTotal(100, 0)).toBe(0)
  })

  it('returns 0 for negative values', () => {
    expect(calculateTotal(-1, 10)).toBe(0)
    expect(calculateTotal(5, -100)).toBe(0)
    expect(calculateTotal(-2, -2)).toBe(0)
  })

  it('returns 0 for invalid (non-finite) input', () => {
    expect(calculateTotal(NaN, 100)).toBe(0)
    expect(calculateTotal(100, NaN)).toBe(0)
    expect(calculateTotal(Infinity, 10)).toBe(0)
    expect(calculateTotal(10, Infinity)).toBe(0)
    expect(calculateTotal(undefined as unknown as number, 10)).toBe(0)
    expect(calculateTotal(10, undefined as unknown as number)).toBe(0)
  })
})
