// client/src/utils/formatDate.js
import { format, formatDistanceToNow, isValid } from 'date-fns';

/**
 * Format a date string/object into a readable format
 * @param {string|Date} date - The date to format
 * @param {string} formatStr - Format string (default: 'MMM d, yyyy')
 * @returns {string} Formatted date
 */
export function formatDate(date, formatStr = 'MMM d, yyyy') {
  const dateObj = new Date(date);
  
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  
  return format(dateObj, formatStr);
}

/**
 * Format date as relative time (e.g. "2 days ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time
 */
export function formatRelativeTime(date) {
  const dateObj = new Date(date);
  
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true });
}
