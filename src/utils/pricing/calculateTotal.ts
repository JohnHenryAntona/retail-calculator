/**
 * Calculates the raw total price before discounts or taxes.
 * @param quantity - number of items purchased
 * @param pricePerItem - price per individual item
 * @returns total value
 */
export function calculateTotal(quantity: number, pricePerItem: number): number {
  if (quantity < 0 || pricePerItem < 0) return 0
  return quantity * pricePerItem
}
