# Retail Calculator Foodstaffs Coding Test
A simple, test-driven retail price calculator built with **React + TypeScript + Tailwind CSS**.  
It calculates order total, applies a discount based on value, and adds region-specific tax.

---

## Features
- Accepts quantity, price per item, and 3-letter region code
- Calculates:
  - Total price
  - Discount (based on total)
  - Tax (based on region)
  - Final payable amount
- Inline input validation with user-friendly error messages
- Fully unit & integration tested with **Vitest + React Testing Library**
- Responsive, utility-first styling using **Tailwind CSS**

---

## Stack

- Framework
    - React, TS, create-react-app with --template typescript parameter
- Styling
    - Tailwind CSS
- Testing
    - Vitest (unit test)
    - React Testing Lib (UI/integration test)
    - @testing-library/user-event (simulate real user interactions)
- Dev tools
    - ESLint (TS and react linting)
    - Prettier (formatting)
- Package Management
    - npm

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/JohnHenryAntona/retail-calculator.git
cd retail-calculator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm install
```

---

## Run Tests

### 1. Run Unit + Integration Tests

```bash
npm run test
```

### 2. Lint and Format

```bash
npm run lint
npm run lint:fix
npm run format
```

## Folder Structure

```bash
src/
├── components/          # UI components
│   └── __tests__/       # Unit & integration tests
│   └── CalculatorForm.tsx
├── utils/               # Pure functions for pricing
│   └── pricing/
│       ├── __tests__/       # Unit tests
│       ├── calculateTotal.ts
│       ├── getDiscountRate.ts
│       ├── getTaxRate.ts
│       └── calculateFinalPrice.ts
└── index.tsx            # App entry point
```