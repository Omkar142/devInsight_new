// client/src/utils/truncateText.js
/**
 * Truncate text to a specified length and add ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) {
      return text;
    }
    
    return text.slice(0, maxLength).trim() + '...';
  }