import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { CalculatorForm } from '../CalculatorForm'

describe('CalculatorForm - Integration', () => {
  it('calculates and displays price breakdown from user input', async () => {
    render(<CalculatorForm />)
    const user = userEvent.setup()

    // Fill in the form
    await user.type(screen.getByLabelText(/quantity/i), '10')
    await user.type(screen.getByLabelText(/price per item/i), '1000')
    await user.type(screen.getByLabelText(/region code/i), 'AUK')
    await user.click(screen.getByRole('button', { name: /calculate/i }))

    // Assert result appears using flexible matchers
    expect(screen.getByText(/calculation summary/i)).toBeInTheDocument()

    expect(
      screen.getByText((_, node) => node?.textContent === 'Total: $10,000.00')
    ).toBeInTheDocument()

    expect(
      screen.getByText((_, node) => node?.textContent === 'Discount Rate: 10%')
    ).toBeInTheDocument()

    expect(
      screen.getByText((_, node) => node?.textContent === 'Discount Amount: $1,000.00')
    ).toBeInTheDocument()

    expect(
      screen.getByText((_, node) => node?.textContent === 'Discounted Total: $9,000.00')
    ).toBeInTheDocument()

    expect(
      screen.getByText((_, node) => node?.textContent === 'Tax Rate: 6.85%')
    ).toBeInTheDocument()

    expect(
      screen.getByText((_, node) => node?.textContent === 'Tax Amount: $616.50')
    ).toBeInTheDocument()

    expect(
      screen.getByText((_, node) => node?.textContent === 'Final Total: $9,616.50')
    ).toBeInTheDocument()
  })
})
