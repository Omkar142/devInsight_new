// client/src/utils/getSourceInfo.js
import { 
    SiLeetcode, 
    SiStackoverflow, 
    SiReddit, 
    SiHackernews,
    SiTechcrunch
  } from 'react-icons/si';
  
  /**
   * Get information about a content source
   * @param {string} source - Source name
   * @returns {object} Source information (name, icon, color)
   */
  export function getSourceInfo(source) {
    switch (source?.toLowerCase()) {
      case 'leetcode':
        return {
          name: 'LeetCode',
          icon: SiLeetcode,
          initials: 'LC',
          color: 'yellow',
          bgClass: 'bg-yellow-100',
          textClass: 'text-yellow-800',
          darkBgClass: 'dark:bg-yellow-900',
          darkTextClass: 'dark:text-yellow-200'
        };
      case 'reddit':
        return {
          name: 'Reddit',
          icon: SiReddit,
          initials: 'RD',
          color: 'orange',
          bgClass: 'bg-orange-100',
          textClass: 'text-orange-800',
          darkBgClass: 'dark:bg-orange-900',
          darkTextClass: 'dark:text-orange-200'
        };
      case 'stackoverflow':
        return {
          name: 'Stack Overflow',
          icon: SiStackoverflow,
          initials: 'SO',
          color: 'blue',
          bgClass: 'bg-blue-100',
          textClass: 'text-blue-800',
          darkBgClass: 'dark:bg-blue-900',
          darkTextClass: 'dark:text-blue-200'
        };
      case 'hackernews':
        return {
          name: 'Hacker News',
          icon: SiHackernews,
          initials: 'HN',
          color: 'orange',
          bgClass: 'bg-orange-100',
          textClass: 'text-orange-800',
          darkBgClass: 'dark:bg-orange-900',
          darkTextClass: 'dark:text-orange-200'
        };
      case 'news':
        return {
          name: 'Tech News',
          icon: SiTechcrunch,
          initials: 'TN',
          color: 'green',
          bgClass: 'bg-green-100',
          textClass: 'text-green-800',
          darkBgClass: 'dark:bg-green-900',
          darkTextClass: 'dark:text-green-200'
        };
      default:
        return {
          name: source ? source.charAt(0).toUpperCase() + source.slice(1) : 'Unknown',
          icon: null,
          initials: source ? source.substring(0, 2).toUpperCase() : 'UK',
          color: 'gray',
          bgClass: 'bg-gray-100',
          textClass: 'text-gray-800',
          darkBgClass: 'dark:bg-gray-700',
          darkTextClass: 'dark:text-gray-200'
        };
    }
  }