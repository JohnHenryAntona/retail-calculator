# Retail Calculator Foodstaffs Coding Test
A simple, test-driven retail price calculator built with **React + TypeScript + Tailwind CSS**.  
It calculates order total, applies a discount based on value, and adds region-specific tax.

---

## Task Breakdown
1. Task #1: Initialize React TypeScript project using CRA
2. Task #2: Setup ESLint and Prettier
3. Task #3: Create calculateTotal utility function (quantity * price)
4. Task #4: Create getDiscountRate utility based on total value (use discount from provided specifications)
5. Task #5: Create getTaxRate utility based on region code (use tax rates from spcifications)
6. Task #6: Create calculateFinalPrice function (apply discount, tax and returns full breakdown)
7. Task #7: Add unit tests for calculateTotal
8. Task #8: Add unit tests for getDiscountRate
9. Task #9: Add unit tests for getTaxRate
10. Task #10: Add unit tests for calculateFinalPrice
11. Task #11: Build input form for item count, price, and region (simple form inputs only)
12. Task #12: Add basic input validation (positive numbers, 3-letter region) (with inline errors if invalid)
13. Task #13: Add submit handler to trigger calculation (display calculated output)
15. Task #14: Add basic CSS styling for layout and form (styled components using Tailwind)
16. Task #15: Add React Testing Library test for rendering form
17. Task #16: Add integration test for full price calculation flow (simulate user input and check output)
18. Task #17: Write README instructions (setup, test, run app)
19. Task #18: Add notes and decisions taken (slicing, logic, structure)
20. Task #19: Final clean up, check all PRs are merged to main

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
git clone <your-repo-url>
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