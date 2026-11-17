# Copilot instructions for this repository

This repository is a Playwright end-to-end test suite for the Beeyor storefront (`https://shopping.beeyor.com/`). The code is not the application itself; it is the browser automation layer that validates UI flows, product pages, and login behavior.

## Setup

```bash
npm ci
npx playwright install --with-deps
```

The project uses Playwright with TypeScript, and the repo-level configuration is in `playwright.config.ts`.

## Build, test, and validation commands

There is no `build` or `lint` script in `package.json`. The effective validation commands for this repo are Playwright and TypeScript checks:

```bash
# Run the whole suite
npx playwright test

# Run a single file
npx playwright test tests/login/login-fixture.spec.ts
npx playwright test tests/home/product-title-price.spec.ts

# Run a single test by name / regex
npx playwright test --grep "Verify a user can login to the application with valid credentials"

# Run smoke-tagged tests
npx playwright test --grep "@smoke"

# Run regression-tagged tests
npx playwright test --grep "@regression"

# TypeScript validation
npx tsc --noEmit
```

CI uses the same Playwright runner via `.github/workflows/playwright.yml`. The workflow supports `Smoke`, `Regression`, and `All` runs, and can also filter by a test name.

## High-level architecture

The project follows a page-object-model structure:

- `tests/` contains end-to-end specs. Each test exercises a user flow or page behavior and generally imports a shared fixture.
- `fixtures/navigation.fixture.ts` centralizes reusable browser setup and page-state setup such as login and starting navigation flows.
- `pages/` contains page objects representing application screens (`LoginPage`, `HomePage`, `MyAccountPage`, `Navigation`). These classes extend a shared `BasePage` helper for common Playwright operations.
- `components/` contains reusable UI region abstractions such as `ProductsTable` and `Product`, which encapsulate logic for reading product list data.
- `actions/` contains small navigation helpers (`goToStartPage`, `goToLoginPage`) that move from one page to another and return page objects.
- `utilities/` holds simple helper logic such as numeric parsing used by product price assertions.

The app under test is a storefront, and tests mainly validate product listings and login flows rather than backend APIs or service-layer logic.

## Key conventions in this codebase

- Prefer page objects and component wrappers over inline selectors in tests. Most UI interactions are abstracted into methods such as `inputUsername()`, `clickLoginButton()`, `getTrendingProductsTable()`, and `getCurrentProducts()`.
- Use the shared Playwright fixture from `fixtures/navigation.fixture.ts` instead of repeating setup logic in each spec.
- Keep tests tagged with the repo's conventions (`@smoke`, `@regression`, `@login`, `@positive`) when they match the CI workflow patterns.
- Use `test.describe(...)` and `test.beforeEach(...)` to share page setup for related scenarios, as seen in the home-page product tests.
- Use `expect.soft(...)` for multi-assertion checks on product data when the test is validating several values on the same entity.
- The project intentionally uses a single Chromium project in `playwright.config.ts`, with a maximized browser window and failure capture (screenshots/video on failure).
- Avoid creating new app logic or alternative test styles; this repo's pattern is browser-flow driven UI automation built around the Playwright page object model.

## Working style

When adding or modifying tests, follow the existing structure:

1. Add or update the relevant page/component object first when the UI interaction is new or repeated.
2. Reuse the shared fixture or navigation helpers instead of duplicating setup steps.
3. Put the scenario in `tests/` and keep it aligned with the existing tag-based test organization.
4. Prefer stable selectors and user-visible text-based waits over brittle timing-only assertions.

## Repo-specific notes

- `playwright.config.ts` sets `fullyParallel: true` and uses `retries` only in CI.
- `reporter` is HTML in local runs and HTML + blob in CI.
- `timeout` is 30 seconds per test, and `actionTimeout` is 20 seconds.
- The site is navigated with real browser flows; do not assume mocked data or unit-test behavior.
