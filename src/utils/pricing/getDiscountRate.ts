/**
 * Returns the discount rate (as a decimal) based on the total order value.
 * Rates based on tiered order thresholds.
 *
 * @param total - Raw total order value before discounts.
 * @returns Discount rate (e.g., 0.05 for 5%)
 */
export function getDiscountRate(total: number): number {
  if (!Number.isFinite(total) || total < 0) return 0

  if (total >= 50000) return 0.15
  if (total >= 10000) return 0.1
  if (total >= 7000) return 0.07
  if (total >= 5000) return 0.05
  if (total >= 1000) return 0.03

  return 0
}

/**
 * Returns the discount rate (as a percentage string) based on the total order value.
 * Rates based on tiered order thresholds.
 *
 * @param total - Raw total order value before discounts.
 * @returns Discount rate as a percentage string (e.g., "5%")
 */
export function getDiscountRateString(total: number): string {
  const rate = getDiscountRate(total)
  return rate > 0 ? `${rate * 100}%` : '0%'
}
