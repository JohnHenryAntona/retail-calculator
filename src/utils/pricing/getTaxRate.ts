/**
 * Returns the regional tax rate as a decimal based on 3-letter region code.
 *
 * @param region - 3-letter region code (case-insensitive)
 * @returns Tax rate (e.g., 0.08 for 8%)
 */
export function getTaxRate(region: string): number {
  if (!region) return 0

  const code = region.toUpperCase()

  const regionTaxMap: Record<string, number> = {
    AUK: 0.0685,
    WLG: 0.08,
    WAI: 0.0625,
    CHC: 0.04,
    TAS: 0.0825,
  }

  return regionTaxMap[code] ?? 0
}
/**
 * Returns the regional tax rate as a percentage string based on 3-letter region code.
 *
 * @param region - 3-letter region code (case-insensitive)
 * @returns Tax rate as a percentage string (e.g., "8%")
 */
export function getTaxRateString(region: string): string {
  const rate = getTaxRate(region)
  return rate > 0 ? `${rate * 100}%` : '0%'
}

