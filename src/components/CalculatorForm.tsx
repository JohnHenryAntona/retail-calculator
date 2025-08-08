import { useState } from 'react'
import { calculateFinalPrice, FinalPriceBreakdown } from '../utils/pricing/calculateFinalPrice'

export function CalculatorForm() {
  const [quantity, setQuantity] = useState('')
  const [pricePerItem, setPricePerItem] = useState('')
  const [region, setRegion] = useState('')
  const [result, setResult] = useState<FinalPriceBreakdown | null>(null)

  const [errors, setErrors] = useState({
    quantity: '',
    price: '',
    region: '',
  })

  // Handle form validation and calculation
  const validate = () => {
    const newErrors = { quantity: '', price: '', region: '' }

    const qty = Number(quantity)
    const price = Number(pricePerItem)
    const reg = region.trim().toUpperCase()

    if (!qty || qty <= 0 || !Number.isInteger(qty)) {
      newErrors.quantity = 'Quantity must be a positive integer.'
    }

    if (!price || price <= 0) {
      newErrors.price = 'Price must be a positive number.'
    }

    if (!/^[A-Z]{3}$/.test(reg)) {
      newErrors.region = 'Region must be exactly 3 letters.'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((msg) => msg === '')
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const breakdown = calculateFinalPrice(
      Number(quantity),
      Number(pricePerItem),
      region.trim().toUpperCase()
    )

    setResult(breakdown)
  }

  return (
    <>
      <form
        className="w-full max-w-md mx-auto space-y-6 bg-white p-6 rounded shadow"
        onSubmit={handleSubmit}
      >
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter number of items"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="price">
            Price per Item
          </label>
          <input
            id="price"
            type="number"
            value={pricePerItem}
            onChange={(e) => setPricePerItem(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter price per item"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="region">
            Region Code
          </label>
          <input
            id="region"
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border px-3 py-2 rounded uppercase"
            placeholder="e.g. AUK"
            maxLength={3}
          />
          {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Calculate
        </button>
      </form>

      {/* Show result */}
      {result && (
        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Calculation Result</h2>
          <ul className="space-y-1 text-sm">
            <li>Total: ${result.total.toFixed(2)}</li>
            <li>Discount Rate: {(result.discountRate * 100).toFixed(0)}%</li>
            <li>Discount Amount: ${result.discountAmount.toFixed(2)}</li>
            <li>Discounted Total: ${result.discountedTotal.toFixed(2)}</li>
            <li>Tax Rate: {(result.taxRate * 100).toFixed(2)}%</li>
            <li>Tax Amount: ${result.taxAmount.toFixed(2)}</li>
            <li className="font-bold">Final Total: ${result.finalTotal.toFixed(2)}</li>
          </ul>
        </div>
      )}
    </>
  )
}
