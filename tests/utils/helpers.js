/**
 * Test Utilities
 * Common helper functions for testing
 */

/**
 * Format timestamp for logging
 * @returns {string} Formatted timestamp
 */
const getTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * Log with timestamp
 * @param {string} message - Message to log
 */
const logWithTime = (message) => {
  console.log(`[${getTimestamp()}] ${message}`);
};

/**
 * Log test section
 * @param {string} sectionName - Name of test section
 */
const logSection = (sectionName) => {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${sectionName}`);
  console.log(`${'═'.repeat(60)}\n`);
};

/**
 * Log test result
 * @param {boolean} success - Whether test passed
 * @param {string} message - Result message
 */
const logResult = (success, message) => {
  const icon = success ? '✅' : '❌';
  console.log(`${icon} ${message}`);
};

module.exports = {
  getTimestamp,
  logWithTime,
  logSection,
  logResult
};
