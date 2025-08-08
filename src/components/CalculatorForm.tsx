import { useState } from 'react'

export function CalculatorForm() {
  const [quantity, setQuantity] = useState('')
  const [pricePerItem, setPricePerItem] = useState('')
  const [region, setRegion] = useState('')

  return (
    <form className="w-full max-w-md mx-auto space-y-6 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="quantity">
          Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter number of items"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="price">
          Price per Item
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={pricePerItem}
          onChange={(e) => setPricePerItem(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter price per item"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="region">
          Region Code
        </label>
        <input
          id="region"
          name="region"
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full border px-3 py-2 rounded uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. AUK"
        />
      </div>
    </form>
  )
}
