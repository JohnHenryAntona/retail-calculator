# Developer Notes & Architecture Decisions

This document captures the key design decisions, architectural structure, logic slicing, and implementation rationale behind the Retail Calculator project.

---

## 1. Project Purpose

This app was developed as part of a coding challenge for Foodstuffs North Island. It demonstrates the ability to build a modular, testable, and well-structured React + TypeScript application that performs retail pricing calculations including:

- Quantity × Price
- Discount based on total value
- Tax based on region
- Final price breakdown (subtotal, discount, tax, total)

---

## 2. Task and Feature Slicing

We followed an **atomic and vertical slicing** approach for all tasks. Each feature was implemented in a small, focused scope and completed with accompanying tests before moving to the next.

| Task # | Description |
|--------|-------------|
| Task 1 | Initialize project using `create-react-app` with TypeScript template |
| Task 2 | Configure ESLint and Prettier for code quality and formatting |
| Task 3 | Implement `calculateTotal(quantity, price)` utility |
| Task 4 | Implement `getDiscountRate(total)` utility with thresholds |
| Task 5 | Implement `getTaxRate(region)` utility with hardcoded regional tax rates |
| Task 6 | Implement `calculateFinalPrice()` utility to combine subtotal, discount, and tax |
| Task 7 | Unit tests for `calculateTotal` |
| Task 8 | Unit tests for `getDiscountRate` |
| Task 9 | Unit tests for `getTaxRate` |
| Task 10 | Unit tests for `calculateFinalPrice` |
| Task 11 | Build form UI component `CalculatorForm.tsx` with input fields |
| Task 12 | Add basic inline validation (e.g. positive quantity/price, 3-letter region) |
| Task 13 | Submit handler to trigger price calculation and show result |
| Task 14 | Style layout using Tailwind CSS |
| Task 15 | Add React Testing Library test to check form renders |
| Task 16 | Integration test simulating user input and verifying displayed breakdown |
| Task 17 | Create README with setup and run instructions |
| Task 18 | Document architectural decisions and slicing strategy |
| Task 19 | Final cleanup and merge verification checklist (manual QA, lint, format, tests) |

---

## 3. Architectural Overview

### 3.1 Code Structure

The project uses a domain-driven layout with clear separation of UI components, utility logic, and tests:

```bash
src/
├── components/
│ └── CalculatorForm.tsx # Main input form component
│   └── tests/
│       ├── CalculatorForm.test.tsx
│       └── CalculatorForm.integration.test.tsx
│
├── utils/
│ └── pricing/ # Domain logic for pricing
│   ├── calculateTotal.ts
│   ├── getDiscountRate.ts
│   ├── getTaxRate.ts
│   ├── calculateFinalPrice.ts
│   └── tests/
│       ├── calculateTotal.test.ts
│       ├── getDiscountRate.test.ts
│       ├── getTaxRate.test.ts
│       └── calculateFinalPrice.test.ts
│
├── App.tsx # Root app component
├── index.tsx # Entry point
├── index.css, App.css # Global styles
└── test setup, config, types # ESLint, Prettier, Vitest config
```


### 3.2 Component Design

- Only one stateful form component `CalculatorForm.tsx`
- All business logic is separated into pure functions
- Form includes:
  - Quantity input
  - Price input
  - Region input
  - Real-time validation with error messages
  - Submit button to calculate and display result

---

## 4. Pricing Logic Details

### 4.1 Total Price

```ts
export function calculateTotal(quantity: number, price: number): number
```
- Multiplies quantity × price
- Guards against invalid input (non-finite or negative)

### 4.2 Discount Rate

```ts
export function getDiscountRate(total: number): number
```
- Returns percentage:
    - 5% if total ≥ 10000
    - 3% if total ≥ 5000
    - 0% otherwise

### 4.3 Tax Rate

```ts
export function getTaxRate(region: string): number
```
- Hardcoded region tax mapping:
    - AUK: 0.0685 → 6.85%
    - WLG: 0.08 → 8.00%
    - WAI: 0.0625 → 6.25%
    - CHC: 0.04 → 4.00%
    - TAS: 0.0825 → 8.25%

### 4.3 Final Price

```ts
export function calculateFinalPrice(quantity, price, region): FinalPriceBreakdown
```
Returns:
```ts
{
  totalBeforeDiscount: number,
  discountRate: number,
  discountAmount: number,
  taxRate: number,
  taxAmount: number,
  finalPrice: number
}
```

---

## 5. Testing Strategy

### 5.1 Unit Testing (Vitest)

Located under `__tests__` folders next to each function.

Covers all pricing logic:

- Valid and invalid inputs
- Edge thresholds
- Rounding and percentage logic

### 5.2 Component Testing

- Form render test: `CalculatorForm.test.tsx`
- Integration test for full form interaction: `CalculatorForm.integration.test.tsx`

Tested:

- Input validation
- Submit interaction
- Output matching breakdown values

### 5.3 Lint & Format

- ESLint with `typescript-eslint`, `react` rules
- Prettier config using `.cjs` file

---

## 6. Styling Approach

- Tailwind CSS used for all layout and spacing
- No custom CSS frameworks or pre-processors
- Responsive and centered layout
- Clean and readable forms with minimal code overhead

---

## 7. Decisions and Justifications

| Decision                        | Reason                                                |
|--------------------------------|--------------------------------------------------------|
| Use of atomic utility functions| Easy to test, reuse, and extend                        |
| Form as single component       | App has only one interaction surface                   |
| No external validation lib     | Handled with simple in-component logic                 |
| Tailwind over CSS-in-JS        | Faster setup, fewer dependencies                       |
| Vitest over Jest               | Faster tests, easier setup in Vite-compatible projects |
| Flat state                     | No need for Redux or global state in a single-form app |

---

## 8. Opportunities for Extension

- Extract pricing logic into a `usePricingEngine()` hook
- Add dropdown/select for regions instead of free text
- Replace inline validation with Zod or Yup
- Store breakdown history in context/localStorage
- Add currency formatting for different regions
- Deploy with Vercel or Netlify
- Add E2E tests with Playwright

---

## 9. Manual Verification Checklist (Completed in Task #19)

- All inputs show correct error messages for invalid entries
- Prices are calculated correctly using known inputs
- Total breakdown displayed after form submission
- Tailwind styles applied correctly
- All unit and integration tests passing
- Lint, format, and type checks pass
