import React, { useState } from 'react'
import { z } from 'zod'

interface RegionTaxCodeProps {
  regionTaxMap: Record<string, number>
  setRegionTaxMap: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

export function RegionTaxCode({ regionTaxMap, setRegionTaxMap }: RegionTaxCodeProps) {
  const [newRegionCode, setNewRegionCode] = useState('')
  const [newRegionTax, setNewRegionTax] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ newRegionCode?: string; newRegionTax?: string }>(
    {}
  )

  const allowedRegions = Object.keys(regionTaxMap)

  const regionFormSchema = z.object({
    newRegionCode: z
      .string()
      .regex(/^[A-Z]{3}$/, { message: 'Region code must be exactly 3 uppercase letters.' })
      .refine((val) => !allowedRegions.includes(val.trim().toUpperCase()), {
        message: 'Region code already exists.',
      }),
    newRegionTax: z
      .string()
      .refine((val) => /^\d+(\.\d+)?$/.test(val) && parseFloat(val) >= 0 && parseFloat(val) <= 1, {
        message: 'Tax rate must be a number between 0 and 1.',
      }),
  })

  const handleAddRegion = (e: React.FormEvent) => {
    e.preventDefault()
    const code = newRegionCode.trim().toUpperCase()
    const tax = parseFloat(newRegionTax)

    const result = regionFormSchema.safeParse({ newRegionCode: code, newRegionTax })
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      setFieldErrors({
        newRegionCode: errors.newRegionCode?.[0] || '',
        newRegionTax: errors.newRegionTax?.[0] || '',
      })
      return
    }

    setRegionTaxMap({ ...regionTaxMap, [code]: tax })
    setNewRegionCode('')
    setNewRegionTax('')
    setFieldErrors({})
  }

  const handleDeleteRegion = (code: string) => {
    const updated = { ...regionTaxMap }
    delete updated[code]
    setRegionTaxMap(updated)
  }

  return (
    <section className="bg-white p-6 rounded-xl shadow space-y-6 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Manage Region Tax Codes</h2>
      <form onSubmit={handleAddRegion} className="space-y-4">
        <div>
          <label htmlFor="newRegionCode" className="block text-sm font-semibold mb-1 text-gray-700">
            Region Code
          </label>
          <input
            id="newRegionCode"
            type="text"
            value={newRegionCode}
            onChange={(e) => setNewRegionCode(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. ABC"
            maxLength={3}
          />
          {fieldErrors.newRegionCode && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.newRegionCode}</p>
          )}
        </div>
        <div>
          <label htmlFor="newRegionTax" className="block text-sm font-semibold mb-1 text-gray-700">
            Tax Rate (0 - 1)
          </label>
          <input
            id="newRegionTax"
            type="number"
            step="0.0001"
            value={newRegionTax}
            onChange={(e) => setNewRegionTax(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 0.07"
            min={0}
            max={1}
          />
          {fieldErrors.newRegionTax && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.newRegionTax}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Region
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {Object.entries(regionTaxMap).map(([code, tax]) => (
          <li key={code} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
            <span>
              <strong>{code}</strong>: {tax}
            </span>
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => handleDeleteRegion(code)}
              disabled={allowedRegions.length === 1}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
