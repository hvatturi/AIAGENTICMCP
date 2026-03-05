const BasePage = require('./BasePage');

/**
 * GoogleSearchPage Class
 * Page Object for Google Search functionality
 */
class GoogleSearchPage extends BasePage {
  /**
   * Constructor
   * @param {Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    this.searchUrl = 'https://www.google.com/search';
  }

  /**
   * Navigate to Google Search homepage
   */
  async navigateToGoogle() {
    console.log('📍 Navigating to Google...');
    await this.navigate('https://www.google.com');
  }

  /**
   * Navigate to Google Search with query
   * @param {string} query - Search query
   */
  async navigateWithQuery(query) {
    console.log(`🔍 Navigating to Google search for: "${query}"`);
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `${this.searchUrl}?q=${encodedQuery}`;
    await this.navigate(searchUrl);
  }

  /**
   * Perform a search by entering text in search box and pressing Enter
   * @param {string} query - Search query
   */
  async performSearch(query) {
    try {
      console.log(`🔎 Performing search for: "${query}"`);
      
      // Try to find and fill the search box
      const searchBoxSelector = 'input[name="q"]';
      await this.waitForElement(searchBoxSelector, 5000);
      await this.fillText(searchBoxSelector, query);
      console.log(`✓ Entered "${query}" in search box`);

      // Press Enter to search
      await this.page.press(searchBoxSelector, 'Enter');
      console.log('✓ Search submitted');
      
      // Wait for results to load
      await this.wait(3000);
    } catch (error) {
      console.log('⚠️  Could not find search box, using direct URL navigation instead');
      await this.navigateWithQuery(query);
    }
  }

  /**
   * Extract all links from the page
   * @param {number} limit - Maximum number of links to extract
   * @returns {Array} Array of link objects {title, url}
   */
  async extractLinks(limit = 25) {
    console.log('📎 Extracting all links from page...');
    
    const links = await this.evaluate((maxLinks) => {
      const linksList = [];
      const anchors = document.querySelectorAll('a[href]');
      
      anchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        const text = anchor.textContent?.trim();
        
        // Only include links that have href and text
        if (href && text && text.length > 0 && href.length > 1) {
          // Skip certain types of links
          if (!href.startsWith('javascript:') && 
              !href.includes('/search?') &&
              !href.includes('/search%3F')) {
            linksList.push({
              title: text.substring(0, 120),
              url: href
            });
          }
        }
      });
      
      // Remove duplicates
      const uniqueLinks = [];
      const seen = new Set();
      
      for (const link of linksList) {
        if (!seen.has(link.url)) {
          seen.add(link.url);
          uniqueLinks.push(link);
        }
      }
      
      return uniqueLinks.slice(0, maxLinks);
    }, limit);

    console.log(`✓ Extracted ${links.length} unique links`);
    return links;
  }

  /**
   * Get all links from search results
   * @param {number} limit - Maximum number of links
   * @returns {Array} Array of link objects
   */
  async getSearchResults(limit = 25) {
    return await this.extractLinks(limit);
  }

  /**
   * Print links in a formatted way
   * @param {Array} links - Array of link objects
   * @param {string} title - Title for the output
   */
  async printLinks(links, title = 'SEARCH RESULTS') {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log(`║${title.padEnd(52)}║`.substring(0, 54) + '║');
    console.log('╚════════════════════════════════════════════════════╝\n');
    
    if (links.length === 0) {
      console.log('⚠️  No links found - Google may have blocked the request or no results available.');
    } else {
      links.forEach((link, index) => {
        console.log(`${index + 1}. ${link.title}`);
        console.log(`   📎 ${link.url}\n`);
      });
    }

    console.log('╔════════════════════════════════════════════════════╗');
    console.log(`║  Total Links Found: ${links.length.toString().padEnd(37)}║`);
    console.log('╚════════════════════════════════════════════════════╝\n');
  }

  /**
   * Search and get results
   * @param {string} query - Search query
   * @param {number} limit - Maximum links to extract
   * @returns {Array} Array of search results
   */
  async searchAndGetResults(query, limit = 25) {
    await this.navigateWithQuery(query);
    await this.wait(3000);
    return await this.extractLinks(limit);
  }
}

module.exports = GoogleSearchPage;
