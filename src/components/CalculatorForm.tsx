import { useState, useEffect } from 'react'
import { z } from 'zod'
import { calculateFinalPrice, FinalPriceBreakdown } from '../utils/pricing/calculateFinalPrice'
import { PriceBreakdown } from './PriceBreakdown'
import { RegionTaxCode } from './RegionTaxCode'
// import { TextInput } from './TextInput'
// TODO: Ensure TextInput.tsx exists in the same folder, or update the import path below:
import { TextInput } from './inputs/TextInput'
import { SelectInput } from './inputs/SelectInput'

export function CalculatorForm() {
  const [quantity, setQuantity] = useState('')
  const [pricePerItem, setPricePerItem] = useState('')
  const [region, setRegion] = useState('')
  const [result, setResult] = useState<FinalPriceBreakdown | null>(null)
  const [errors, setErrors] = useState({ quantity: '', price: '', region: '' })

  // regionTaxMap state
  const [regionTaxMap, setRegionTaxMap] = useState<Record<string, number>>(() => {
    const stored = localStorage.getItem('regionTaxMap')
    if (stored) return JSON.parse(stored)
    return {
      AUK: 0.0685,
      WLG: 0.08,
      WAI: 0.0625,
      CHC: 0.04,
      TAS: 0.0825,
    }
  })

  // Save to localStorage whenever regionTaxMap changes
  useEffect(() => {
    localStorage.setItem('regionTaxMap', JSON.stringify(regionTaxMap))
  }, [regionTaxMap])

  const allowedRegions = Object.keys(regionTaxMap)

  const formSchema = z.object({
    quantity: z.string().refine((val) => /^\d+$/.test(val) && parseInt(val) > 0, {
      message: 'Quantity must be a positive integer.',
    }),
    pricePerItem: z.string().refine((val) => /^\d+(\.\d+)?$/.test(val) && parseFloat(val) > 0, {
      message: 'Price must be a positive number.',
    }),
    region: z
      .string()
      .regex(/^[A-Z]{3}$/, { message: 'Region must be exactly 3 uppercase letters.' })
      .refine((val) => allowedRegions.includes(val.trim().toUpperCase()), {
        message: `Please select a valid region. Region must be one of: ${allowedRegions.join(', ')}.`,
      }),
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const breakdown = calculateFinalPrice(
      Number(quantity),
      Number(pricePerItem),
      region.trim().toUpperCase(),
      regionTaxMap
    )

    setResult(breakdown)
  }

  // Prepare options for SelectInput
  const regionOptions = [
    { value: '', label: 'Select region' },
    ...allowedRegions.map((code) => ({
      value: code,
      label: `${code} (${(regionTaxMap[code] * 100).toFixed(2)}%)`,
    })),
  ]

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* Left column: Region Code Management */}
        <div className="w-full md:w-1/2">
          <RegionTaxCode regionTaxMap={regionTaxMap} setRegionTaxMap={setRegionTaxMap} />
        </div>
        {/* Right column: Retail Calculator Form */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6 mt-6">
            <TextInput
              id="quantity"
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter number of items"
              error={errors.quantity}
            />
            <TextInput
              id="price"
              label="Price per Item"
              type="number"
              value={pricePerItem}
              onChange={(e) => setPricePerItem(e.target.value)}
              placeholder="Enter price per item"
              error={errors.price}
            />
            <SelectInput
              id="region"
              label="Region Code"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              options={regionOptions}
              error={errors.region}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Calculate
            </button>
          </form>
          {/* Show result */}
          {result && <PriceBreakdown breakdown={result} />}
        </div>
      </div>
    </>
  )
}
