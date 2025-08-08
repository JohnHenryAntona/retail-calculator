import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CalculatorForm } from '../CalculatorForm'

describe('CalculatorForm', () => {
  it('renders quantity, price, region inputs and submit button', () => {
    render(<CalculatorForm />)

    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price per item/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/region code/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument()
  })
})
