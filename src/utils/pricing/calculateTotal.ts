/**
 * Calculates the raw total price before any discounts or taxes.
 *
 * @param quantity - The number of items.
 * @param pricePerItem - The price of a single item.
 * @returns The total price (quantity * price per item), or 0 if invalid.
 */
export function calculateTotal(quantity: number, pricePerItem: number): number {
  if (
    typeof quantity !== 'number' ||
    typeof pricePerItem !== 'number' ||
    !Number.isFinite(quantity) ||
    !Number.isFinite(pricePerItem) ||
    quantity < 0 ||
    pricePerItem < 0
  ) {
    return 0
  }

  return quantity * pricePerItem
}
