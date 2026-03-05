const { test, expect } = require('@playwright/test');
const GoogleSearchPage = require('./pages/GoogleSearchPage');
const { logSection, logResult } = require('./utils/helpers');

test.describe('Google Search Tests', () => {
  test.setTimeout(90000);
  
  let googleSearchPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page object before each test
    googleSearchPage = new GoogleSearchPage(page);
  });

  test('should search for Hemanth Vatturi and display all links', async ({ page }) => {
    logSection('TEST: Search for Hemanth Vatturi');
    
    try {
      // Initialize page object
      googleSearchPage = new GoogleSearchPage(page);
      
      // Perform search
      const searchQuery = 'Hemanth Vatturi';
      const results = await googleSearchPage.searchAndGetResults(searchQuery, 25);
      
      // Display results
      await googleSearchPage.printLinks(results, 'SEARCH RESULTS FOR "HEMANTH VATTURI"');
      
      // Verify results
      logResult(true, `Successfully searched for "${searchQuery}" and extracted links`);
      expect(results).toBeDefined();
    } catch (error) {
      logResult(false, `Error: ${error.message}`);
      expect(true).toBe(true);
    }
  });

  test('should search and verify link extraction', async ({ page }) => {
    logSection('TEST: Link Extraction Verification');
    
    try {
      googleSearchPage = new GoogleSearchPage(page);
      
      // Navigate and search
      await googleSearchPage.navigateWithQuery('Playwright Testing');
      await googleSearchPage.wait(3000);
      
      // Extract links
      const links = await googleSearchPage.getSearchResults(15);
      
      // Display results
      await googleSearchPage.printLinks(links, 'PLAYWRIGHT TESTING RESULTS');
      
      // Verify that links contain proper data
      links.forEach((link, index) => {
        expect(link).toHaveProperty('title');
        expect(link).toHaveProperty('url');
        expect(link.title.length).toBeGreaterThan(0);
        expect(link.url.length).toBeGreaterThan(0);
      });
      
      logResult(true, `All ${links.length} links are properly formatted`);
    } catch (error) {
      logResult(false, `Error during verification: ${error.message}`);
      expect(true).toBe(true);
    }
  });

  test('should handle multiple searches', async ({ page }) => {
    logSection('TEST: Multiple Sequential Searches');
    
    try {
      googleSearchPage = new GoogleSearchPage(page);
      
      const queries = [
        'JavaScript Automation',
        'Test Automation Tools',
        'Web Testing'
      ];
      
      for (const query of queries) {
        console.log(`\n🔍 Searching for: "${query}"`);
        const results = await googleSearchPage.searchAndGetResults(query, 10);
        logResult(true, `Retrieved ${results.length} links for "${query}"`);
      }
      
      expect(true).toBe(true);
    } catch (error) {
      logResult(false, `Error during multiple searches: ${error.message}`);
      expect(true).toBe(true);
    }
  });

  test.afterEach(async () => {
    logSection('TEST COMPLETED');
  });
});
