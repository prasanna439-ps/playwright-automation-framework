# 🎭 Playwright Automation Framework

A scalable, production-grade end-to-end test automation framework built with **Playwright** and **TypeScript**, following Page Object Model (POM) design pattern with BDD support via Cucumber/Gherkin.

> Built by **Prasanna Singari** — Senior Quality Engineer | Melbourne, VIC  
> 📧 prasanna439@gmail.com | 🔗 [LinkedIn](https://linkedin.com/in/prasanna-singari)

---

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Cross-browser E2E automation |
| TypeScript | Strongly typed test code |
| Page Object Model | Maintainable test architecture |
| Cucumber / Gherkin | BDD-style feature files |
| GitHub Actions | CI/CD pipeline |
| Allure Reports | Rich test reporting |
| dotenv | Environment config management |

---

## 📁 Project Structure

```
playwright-framework/
├── tests/
│   ├── e2e/                  # End-to-end test specs
│   └── api/                  # API test specs
├── pages/                    # Page Object Model classes
├── fixtures/                 # Playwright fixtures & test data
├── utils/                    # Helper utilities
├── .github/workflows/        # CI/CD GitHub Actions
├── playwright.config.ts      # Playwright configuration
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm v9+

### Install dependencies
```bash
npm install
npx playwright install
```

### Configure environment
```bash
cp .env.example .env
# Edit .env with your base URL and credentials
```

---

## ▶️ Running Tests

```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run API tests only
npm run test:api

# Run with Allure report
npm run test:report
```

---

## 📊 Reports

After running tests, generate and open the Allure report:
```bash
npm run report:open
```

---

## 🔄 CI/CD

Tests run automatically on every push and pull request via **GitHub Actions**.  
See `.github/workflows/playwright.yml` for the pipeline config.

---

## 🧠 Key Framework Features

- ✅ **Page Object Model** — clean separation of test logic and UI interactions
- ✅ **Reusable fixtures** — shared setup/teardown across test suites
- ✅ **API testing** — REST API validation alongside UI tests
- ✅ **Cross-browser** — Chrome, Firefox, Safari (WebKit)
- ✅ **CI/CD ready** — GitHub Actions pipeline included
- ✅ **Environment config** — `.env` based config for multiple environments
- ✅ **Rich reporting** — Allure reports with screenshots on failure
- ✅ **TypeScript** — type-safe, maintainable test code

---

## 📝 Sample Test: Login Flow

```typescript
test('User can log in with valid credentials', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.TEST_USER!, process.env.TEST_PASS!);
  await dashboardPage.expectWelcomeMessage();
});
```

---

## 🌐 Framework Author

**Prasanna Singari** — 14+ years QA/QE experience across MYOB, Flybuys, Target, Cotton On  
Specialising in test automation, mobile testing, and quality engineering transformation.
