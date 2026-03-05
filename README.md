# Playwright Project

A comprehensive **Playwright testing project** configured with JavaScript, multiple browser engines, mobile device emulation, and **Page Object Model (POM)** pattern for maintainability and reusability.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
tests/
├── pages/                      # Page Objects
│   ├── BasePage.js            # Base page class with common methods
│   ├── GoogleSearchPage.js     # Google Search page object
│   └── index.js               # Page objects export
├── utils/                      # Utilities
│   ├── helpers.js             # Common test helpers
│   └── index.js               # Utils export
├── google-search.spec.js      # Google search tests
└── example.spec.js            # Example tests
playwright.config.js            # Playwright configuration
tsconfig.json                   # TypeScript configuration
package.json                    # Project dependencies
README.md                       # This file
```

## Page Object Model (POM) Pattern

This project follows the **Page Object Model** pattern, which:
- ✅ Separates test logic from page interactions
- ✅ Improves code reusability
- ✅ Makes tests more readable and maintainable
- ✅ Reduces code duplication
- ✅ Makes it easier to update when UI changes

### Creating a New Page Object

1. Create a new file in `tests/pages/` (e.g., `MyPage.js`)
2. Extend `BasePage`
3. Define page-specific methods:

```javascript
const BasePage = require('./BasePage');

class MyPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://example.com';
  }

  async navigateToPage() {
    await this.navigate(this.url);
  }

  async performAction() {
    // Page-specific actions
  }
}

module.exports = MyPage;
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests for specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Generate test code
```bash
npm run codegen
```

### View HTML report
```bash
npm run report
```

## Test Examples

### Example 1: Google Search
```javascript
const GoogleSearchPage = require('./pages/GoogleSearchPage');

test('search for a query', async ({ page }) => {
  const googleSearch = new GoogleSearchPage(page);
  
  // Search and get results
  const results = await googleSearch.searchAndGetResults('Your Query', 25);
  
  // Print formatted results
  await googleSearch.printLinks(results, 'SEARCH RESULTS');
});
```

### Example 2: Using Base Page Methods
```javascript
test('interact with page', async ({ page }) => {
  const basePage = new BasePage(page);
  
  await basePage.navigate('https://example.com');
  await basePage.fillText('input[type="text"]', 'Some text');
  await basePage.click('button');
  const value = await basePage.getText('.result');
});
```

## Browser Support
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## Key Features
- 🎯 Page Object Model pattern for better organization
- ⚡ Parallel test execution
- 📸 Automatic screenshots on failure
- 📊 HTML reporting
- 📱 Cross-browser and mobile device testing
- 🔄 Trace recordings on first retry
- 🎨 Formatted console output with emojis and icons
- 🛠️ Reusable utility functions

## Tips

- Use the **Page Object Model** to keep your tests clean and maintainable
- Leverage `BasePage` methods to reduce code duplication
- Use `logSection` and `logResult` helpers for better logging
- Run tests in `headed` mode during development to see what's happening
- Use `debug` mode to step through tests interactively
- Check `playwright-report/` for detailed HTML test reports

## Configuration

All Playwright settings are in `playwright.config.js`. You can modify:
- Test directory and patterns
- Browser selection
- Base URL
- Timeouts and retry policies
- Screenshot and trace recording settings

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)
