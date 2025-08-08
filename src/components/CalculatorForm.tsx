import { useState } from 'react'

export function CalculatorForm() {
  const [quantity, setQuantity] = useState('')
  const [pricePerItem, setPricePerItem] = useState('')
  const [region, setRegion] = useState('')

  const [errors, setErrors] = useState({
    quantity: '',
    price: '',
    region: '',
  })

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

  // Trigger validation on blur for now (submit will come in Task #13)
  const handleBlur = () => validate()

  return (
    <form
      className="w-full max-w-md mx-auto space-y-6 bg-white p-6 rounded shadow"
      onBlur={handleBlur}
    >
      {/* Quantity */}
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
        {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
      </div>

      {/* Price */}
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
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      {/* Region */}
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
          maxLength={3}
        />
        {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
      </div>
    </form>
  )
}
