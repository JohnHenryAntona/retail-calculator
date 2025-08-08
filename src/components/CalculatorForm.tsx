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

  interface FormatCurrency {
    (value: number): string
  }

  const formatCurrency: FormatCurrency = function (value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-6"
      >
        <div>
          <label htmlFor="quantity" className="block text-sm font-semibold mb-1 text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of items"
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-semibold mb-1 text-gray-700">
            Price per Item
          </label>
          <input
            id="price"
            type="number"
            value={pricePerItem}
            onChange={(e) => setPricePerItem(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price per item"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="region" className="block text-sm font-semibold mb-1 text-gray-700">
            Region Code
          </label>
          <input
            id="region"
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. AUK"
            maxLength={3}
          />
          {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Calculate
        </button>
      </form>

      {/* Show result */}
      {result && (
        <div className="max-w-md mx-auto mt-8 bg-blue-50 border border-blue-200 p-5 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-blue-800">Calculation Summary</h2>
          <ul className="space-y-1 text-sm text-gray-800">
            <li>
              <strong>Total:</strong> ${formatCurrency(result.total)}
            </li>
            <li>
              <strong>Discount Rate:</strong> {(result.discountRate * 100).toFixed(0)}%
            </li>
            <li>
              <strong>Discount Amount:</strong> ${formatCurrency(result.discountAmount)}
            </li>
            <li>
              <strong>Discounted Total:</strong> ${formatCurrency(result.discountedTotal)}
            </li>
            <li>
              <strong>Tax Rate:</strong> {(result.taxRate * 100).toFixed(2)}%
            </li>
            <li>
              <strong>Tax Amount:</strong> ${formatCurrency(result.taxAmount)}
            </li>
            <li className="font-bold">
              <strong>Final Total:</strong> ${formatCurrency(result.finalTotal)}
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
