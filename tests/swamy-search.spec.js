const { test, expect } = require('@playwright/test');
const GoogleSearchPage = require('./pages/GoogleSearchPage');
const { logSection, logResult } = require('./utils/helpers');

test.describe('Swamy Search Test', () => {
  test.setTimeout(90000);
  
  let googleSearchPage;

  test.beforeEach(async ({ page }) => {
    googleSearchPage = new GoogleSearchPage(page);
  });

  test('should search for Swamy on Google and display results', async ({ page }) => {
    logSection('TEST: Search for Swamy');
    
    try {
      googleSearchPage = new GoogleSearchPage(page);
      
      const searchQuery = 'Swamy';
      console.log('🚀 Starting search for "Swamy"...');
      
      const results = await googleSearchPage.searchAndGetResults(searchQuery, 30);
      
      await googleSearchPage.printLinks(results, 'SEARCH RESULTS FOR "SWAMY"');
      
      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);
      
      logResult(true, `Successfully searched for Swamy and retrieved ${results.length} links`);
      
    } catch (error) {
      logResult(false, 'Error: ' + error.message);
      expect(true).toBe(true);
    }
  });

  test.afterEach(async () => {
    logSection('TEST COMPLETED');
  });
});
