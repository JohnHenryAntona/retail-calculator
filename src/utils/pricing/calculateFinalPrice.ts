import { calculateTotal } from './calculateTotal'
import { getDiscountRate } from './getDiscountRate'
import { getTaxRate } from './getTaxRate'

/**
 * Represents the final price breakdown including all calculations.
 * Contains:
 * - quantity of items
 * - price per item
 * - region code
 * - total before discounts
 * - discount rate and amount
 * - discounted total
 * - tax rate and amount
 * - final total after tax
 */
export interface FinalPriceBreakdown {
  quantity: number
  pricePerItem: number
  region: string
  total: number
  discountRate: number
  discountAmount: number
  discountedTotal: number
  taxRate: number
  taxAmount: number
  finalTotal: number
}

/**
 * Calculates the final price breakdown for a given quantity, price per item, and region.
 * Applies discounts based on total value and taxes based on region.
 *
 * @param quantity - Number of items purchased
 * @param pricePerItem - Price per individual item
 * @param region - 3-letter region code (case-insensitive)
 * @param regionTaxMap - A record mapping region codes to tax rates
 * @returns FinalPriceBreakdown object containing all calculated values
 */
export function calculateFinalPrice(
  quantity: number,
  pricePerItem: number,
  region: string,
  regionTaxMap: Record<string, number>
): FinalPriceBreakdown {
  const total = calculateTotal(quantity, pricePerItem)
  const discountRate = getDiscountRate(total)
  const discountAmount = total * discountRate
  const discountedTotal = total - discountAmount
  const taxRate = getTaxRate(region, regionTaxMap)
  const taxAmount = discountedTotal * taxRate
  const finalTotal = discountedTotal + taxAmount

  return {
    quantity,
    pricePerItem,
    region,
    total,
    discountRate,
    discountAmount,
    discountedTotal,
    taxRate,
    taxAmount,
    finalTotal,
  }
}
/**
 * Calculates the final price as a number.
 * @param quantity - Number of items purchased
 * @param pricePerItem - Price per individual item
 * @param region - 3-letter region code (case-insensitive)
 * @param regionTaxMap - A record mapping region codes to tax rates
 * @returns Final total price after discounts and taxes
 */
export function calculateFinalPriceValue(
  quantity: number,
  pricePerItem: number,
  region: string,
  regionTaxMap: Record<string, number>
): number {
  const breakdown = calculateFinalPrice(quantity, pricePerItem, region, regionTaxMap)
  return breakdown.finalTotal
}
