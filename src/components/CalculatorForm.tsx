import { useState } from 'react'
import { z } from 'zod'
import { calculateFinalPrice, FinalPriceBreakdown } from '../utils/pricing/calculateFinalPrice'
import { PriceBreakdown } from './PriceBreakdown'

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

  // const regionOptions = [
  //   { code: 'AUK', label: 'Australia (AUK)' },
  //   { code: 'WLG', label: 'Wellington (WLG)' },
  //   { code: 'WAI', label: 'Waikato (WAI)' },
  //   { code: 'CHC', label: 'Christchurch (CHC)' },
  //   { code: 'TAS', label: 'Tasma (TAS)' },
  // ]

  const allowedRegions = ['AUK', 'WLG', 'WAI', 'CHC', 'TAS']

  const formSchema = z.object({
    quantity: z.string().refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, {
      message: 'Quantity must be a positive integer.',
    }),
    pricePerItem: z.string().refine((val) => /^\d+(\.\d+)?$/.test(val) && parseFloat(val) > 0, {
      message: 'Price must be a positive number.',
    }),
    region: z
      .string()
      .regex(/^[A-Z]{3}$/, { message: 'Region must be exactly 3 letters.' })
      // .refine((val) => regionOptions.some((r) => r.code === val), {
      .refine((val) => allowedRegions.includes(val.trim().toUpperCase()), {
        message: 'Please select a valid region. Region must be one of: AUK, WLG, WAI, CHC, TAS.',
      }),
  })

  // Handle form validation and calculation
  const validate = () => {
    const result = formSchema.safeParse({
      quantity,
      pricePerItem,
      region: region.trim().toUpperCase(),
    })

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        quantity: fieldErrors.quantity?.[0] || '',
        price: fieldErrors.pricePerItem?.[0] || '',
        region: fieldErrors.region?.[0] || '',
      })
      return false
    }

    setErrors({ quantity: '', price: '', region: '' })
    return true
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
            placeholder="e.g. AUK, WLG, WAI, CHC or TAS"
            maxLength={3}
          />
          {/* <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a region</option>
            {regionOptions.map((r) => (
              <option key={r.code} value={r.code}>
                {r.label}
              </option>
            ))}
          </select> */}
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
            {/* <li>
              <strong>Final Price Per Item:</strong> ${formatCurrency(result.finalTotal / Number(quantity))}
            </li> */}
            <li className="font-bold">
              <strong>Final Total:</strong> ${formatCurrency(result.finalTotal)}
            </li>
          </ul>
        </div>
      )}
      {/* {result && <PriceBreakdown breakdown={result} />} */}
    </>
  )
}
