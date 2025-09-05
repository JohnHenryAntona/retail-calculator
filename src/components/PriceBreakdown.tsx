type Breakdown = {
  total: number
  discountRate: number
  discountAmount: number
  discountedTotal: number
  taxRate: number
  taxAmount: number
  finalTotal: number
}

interface FormatCurrency {
  (value: number): string
}

const formatCurrency: FormatCurrency = function (value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function PriceBreakdown({ breakdown }: { breakdown: Breakdown }) {
  return (
    <div className="max-w-md mx-auto mt-8 bg-blue-50 border border-blue-200 p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-blue-800">Calculation Summary</h2>
      <ul className="space-y-1 text-sm text-gray-800">
        <li>
          <strong>Total:</strong> ${formatCurrency(breakdown.total)}
        </li>
        <li>
          <strong>Discount Rate:</strong> {(breakdown.discountRate * 100).toFixed(0)}%
        </li>
        <li>
          <strong>Discount Amount:</strong> ${formatCurrency(breakdown.discountAmount)}
        </li>
        <li>
          <strong>Discounted Total:</strong> ${formatCurrency(breakdown.discountedTotal)}
        </li>
        <li>
          <strong>Tax Rate:</strong> {(breakdown.taxRate * 100).toFixed(2)}%
        </li>
        <li>
          <strong>Tax Amount:</strong> ${formatCurrency(breakdown.taxAmount)}
        </li>
        {/* <li>
          <strong>Final Price Per Item:</strong> ${formatCurrency(breakdown.finalTotal / Number(quantity))}
        </li> */}
        <li className="font-bold">
          <strong>Final Total:</strong> ${formatCurrency(breakdown.finalTotal)}
        </li>
      </ul>
    </div>
  )
}
