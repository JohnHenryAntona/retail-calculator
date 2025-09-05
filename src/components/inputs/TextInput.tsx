import React from 'react'

interface TextInputProps {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  error?: string
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-1 text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
