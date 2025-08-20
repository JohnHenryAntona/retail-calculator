import { describe, it, expect } from 'vitest'
import { getTaxRate } from '../getTaxRate'

describe('getTaxRate', () => {
  it('returns correct tax rate for supported regions', () => {
    expect(getTaxRate('AUK')).toBe(0.0685)
    expect(getTaxRate('WLG')).toBe(0.08)
    expect(getTaxRate('WAI')).toBe(0.0625)
    expect(getTaxRate('CHC')).toBe(0.04)
    expect(getTaxRate('TAS')).toBe(0.0825)
  })

  it('is case-insensitive', () => {
    expect(getTaxRate('auk')).toBe(0.0685)
    expect(getTaxRate('wLg')).toBe(0.08)
    expect(getTaxRate('ChC')).toBe(0.04)
  })

  it('returns 0 for unknown or invalid region codes', () => {
    expect(getTaxRate('')).toBe(0)
    expect(getTaxRate('XYZ')).toBe(0)
    expect(getTaxRate(undefined as unknown as string)).toBe(0)
    expect(getTaxRate(null as unknown as string)).toBe(0)
    expect(getTaxRate('123')).toBe(0)
  })
})
