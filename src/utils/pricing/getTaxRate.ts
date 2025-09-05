/**
 * Returns the regional tax rate as a decimal based on 3-letter region code.
 *
 * @param region - 3-letter region code (case-insensitive)
 * @param regionTaxMap - dynamic region tax map
 * @returns Tax rate (e.g., 0.08 for 8%)
 */
export function getTaxRate(region: string, regionTaxMap: Record<string, number>): number {
  if (!region) return 0
  const code = region.toUpperCase()
  return regionTaxMap[code] ?? 0
}

/**
 * Returns the regional tax rate as a percentage string based on 3-letter region code.
 *
 * @param region - 3-letter region code (case-insensitive)
 * @param regionTaxMap - dynamic region tax map
 * @returns Tax rate as a percentage string (e.g., "8%")
 */
export function getTaxRateString(region: string, regionTaxMap: Record<string, number>): string {
  const rate = getTaxRate(region, regionTaxMap)
  return rate > 0 ? `${rate * 100}%` : '0%'
}
