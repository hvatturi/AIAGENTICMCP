# Playwright Project Setup Instructions

This document provides guidance for working with this Playwright test project.

## Project Overview

This is a **Playwright automation testing project** configured with:
- JavaScript for test code
- Multiple browser engines (Chromium, Firefox, WebKit)
- Mobile device emulation (Pixel 5, iPhone 12)
- HTML reporting and trace recordings
- **Page Object Model (POM)** pattern for maintainability

## Getting Started

1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install`
3. Run tests: `npm test`

## Project Structure

```
tests/
├── pages/              # Page Object Models (POM)
│   ├── BasePage.js     # Base class for all pages
│   ├── GoogleSearchPage.js
│   └── index.js
├── utils/              # Test utilities
│   ├── helpers.js      # Common functions
│   └── index.js
├── *.spec.js          # Test files
```

## Common Commands

- `npm test` - Run all tests
- `npm run test:ui` - Interactive UI mode
- `npm run test:headed` - Run with visible browsers
- `npm run test:debug` - Debug tests step-by-step
- `npm run codegen` - Generate test code automatically
- `npm run report` - View HTML report

## Page Object Model (POM) Pattern

This project uses the **Page Object Model** pattern:

### Benefits
✅ Separates test logic from page interactions
✅ Makes tests more readable and maintainable
✅ Reduces code duplication
✅ Easy to update when UI changes
✅ Promotes code reusability

### Creating a Page Object

1. Create file in `tests/pages/YourPage.js`
2. Extend `BasePage`
3. Add page-specific methods:

```javascript
const BasePage = require('./BasePage');

class YourPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://example.com';
  }

  async navigateToPage() {
    await this.navigate(this.url);
  }

  async clickButton() {
    await this.click('button.my-class');
  }
}

module.exports = YourPage;
```

### Using Page Objects in Tests

```javascript
const YourPage = require('./pages/YourPage');

test('my test', async ({ page }) => {
  const yourPage = new YourPage(page);
  await yourPage.navigateToPage();
  await yourPage.clickButton();
});
```

## Development Guidelines

- **Write tests** under `tests/` directory
- **Use `.spec.js`** suffix for test files
- **Create page objects** in `tests/pages/`
- **Extend BasePage** for new page objects
- **Use JSDoc** comments for better IDE support
- **Use helpers** from `tests/utils/` for common functionality

## BasePage Methods

Available methods for all page objects:
- `navigate(url, options)` - Navigate to URL
- `click(selector)` - Click element
- `fillText(selector, text)` - Fill input field
- `getText(selector)` - Get text content
- `waitForElement(selector, timeout)` - Wait for element
- `wait(ms)` - Wait for milliseconds
- `evaluate(fn)` - Execute JavaScript
- `getElements(selector)` - Get multiple elements

## Test Execution

- Tests run in parallel by default (can be configured)
- Screenshots captured on failure
- Traces recorded on first retry
- HTML reports available after test run

## Configuration

All Playwright settings are in `playwright.config.js`. Modify to:
- Change test directory or patterns
- Add/remove browsers
- Set base URL
- Configure timeouts
- Adjust retry policies
