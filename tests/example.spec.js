const { test, expect } = require('@playwright/test');

/**
 * Example Test Suite
 * Demonstrates basic Playwright testing patterns
 */
test.describe('Example Tests', () => {
  test('should navigate to example.com', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://example.com');
    
    // Verify page title
    await expect(page).toHaveTitle('Example Domain');
  });

  test('should find and verify h1 heading', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://example.com');
    
    // Find the h1 element
    const heading = page.locator('h1');
    
    // Verify heading contains expected text
    await expect(heading).toContainText('Example Domain');
    
    // Verify heading is visible
    await expect(heading).toBeVisible();
  });

  test('should check page content structure', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://example.com');
    
    // Find and verify paragraph elements
    const paragraphs = page.locator('p');
    
    // Check that paragraphs exist
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify first paragraph is visible
    const firstParagraph = paragraphs.first();
    await expect(firstParagraph).toBeVisible();
  });
});

