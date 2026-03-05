/**
 * BasePage Class
 * Provides common methods and functionality for all page objects
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   * @param {string} url - The URL to navigate to
   * @param {object} options - Navigation options (waitUntil, etc.)
   */
  async navigate(url, options = {}) {
    await this.page.goto(url, { waitUntil: 'networkidle', ...options });
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Fill text in an input field
   * @param {string} selector - CSS selector
   * @param {string} text - Text to fill
   */
  async fillText(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Click an element
   * @param {string} selector - CSS selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Get text content of an element
   * @param {string} selector - CSS selector
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Wait for a timeout
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms = 1000) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Get all elements matching a selector
   * @param {string} selector - CSS selector
   */
  async getElements(selector) {
    return await this.page.locator(selector).all();
  }

  /**
   * Evaluate JavaScript on the page
   * @param {function} fn - JavaScript function to evaluate
   */
  async evaluate(fn) {
    return await this.page.evaluate(fn);
  }

  /**
   * Take a screenshot
   * @param {string} filename - Filename for screenshot
   */
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: `./screenshots/${filename}` });
  }
}

module.exports = BasePage;
