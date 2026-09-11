# SauceDemo E2E Test Automation Framework

![Playwright Tests](https://github.com/trangnguyen1010/playwright-demo-project/actions/workflows/playwright.yml/badge.svg)

End-to-end UI test automation suite for [SauceDemo](https://www.saucedemo.com/), built with Playwright and TypeScript. This project covers the core purchase flow of an e-commerce application — login, product browsing/sorting, cart management, and checkout — using the Page Object Model, custom fixtures, data-driven testing, and visual regression testing.

## Tech Stack

- **Framework:** [Playwright](https://playwright.dev/) with TypeScript
- **Design Pattern:** Page Object Model (POM)
- **Test Data Management:** Custom fixtures with fixture composition
- **CI/CD:** GitHub Actions
- **Reporting:** Playwright HTML Reporter

## What's Covered

| Feature | Description |
|---|---|
| **Login** | Successful login, invalid credentials, locked-out user (data-driven) |
| **Product Listing** | Sorting by name (A-Z, Z-A) and price (low-high, high-low) |
| **Cart** | Add single/multiple items, verify cart badge count, remove items |
| **Checkout** | Fill customer information, verify order summary totals (subtotal + tax = total), complete order |
| **Visual Regression** | Screenshot comparison on the cart page |

## Project Structure

```
playwright-demo-project/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI pipeline — runs tests on every push
├── fixtures/
│   └── fixtures.ts              # Custom fixtures (auto-login + injected Page Objects)
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data/
│   └── users.ts                 # Test user credentials
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── visual.spec.ts
└── playwright.config.ts
```

## Design Highlights

- **Page Object Model** — each page (Login, Products, Cart, Checkout) is encapsulated in its own class, exposing semantic methods (`addTodo`, `sortBy`, `fillInformation`...) instead of leaking raw locators into test files.
- **Composed fixtures** — a base `loggedInPage` fixture handles authentication once; `productsPage`, `cartPage`, and `checkoutPage` fixtures build on top of it. When a test needs multiple Page Objects, login only runs once, not once per fixture.
- **Business-logic assertions, not hardcoded values** — the checkout test verifies `subtotal + tax ≈ total` as an internal consistency check, rather than re-implementing the tax rate calculation in the test itself.
- **Data-driven testing** — login failure scenarios (invalid password, locked-out user) are parameterized rather than duplicated.

## Running the Tests

Install dependencies and browsers:
```bash
npm install
npx playwright install --with-deps
```

Run the full suite:
```bash
npx playwright test
```

Run a specific file:
```bash
npx playwright test tests/cart.spec.ts
```

Run in UI mode (interactive):
```bash
npx playwright test --ui
```

View the last HTML report:
```bash
npx playwright show-report
```

## Continuous Integration

Tests run automatically on every push via GitHub Actions (`.github/workflows/playwright.yml`). The HTML report is uploaded as a workflow artifact and available for download from the Actions tab, even on failed runs.

## Notes

Test data (`test-data/users.ts`) uses SauceDemo's publicly documented demo accounts (`standard_user`, `locked_out_user`, etc.) — no real credentials are involved.