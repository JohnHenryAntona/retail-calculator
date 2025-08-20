import React from 'react'
import './App.css'
import './index.css'

import { CalculatorForm } from './components/CalculatorForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Retail Calculator</h1>
      <CalculatorForm />
    </div>
  )
}

export default App
