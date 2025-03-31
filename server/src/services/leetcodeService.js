// server/src/services/leetcodeService.js
const axios = require('axios');
const Content = require('../models/Content');
const Tag = require('../models/Tag');
const { logger } = require('../utils/logger');

// Fetch LeetCode content using Google Custom Search API
exports.fetchLeetCodeContent = async () => {
  logger.info('Fetching LeetCode content');
  
  try {
    const searchQueries = [
      'site:leetcode.com/discuss/ interview "Google" "Software Engineer"',
      'site:leetcode.com/discuss/ interview "Amazon" "Software Engineer"',
      'site:leetcode.com/discuss/ interview "Facebook" "Software Engineer"',
      'site:leetcode.com/discuss/ interview "Microsoft" "Software Engineer"',
      'site:leetcode.com/discuss/ compensation "Software Engineer"',
      'site:leetcode.com/discuss/ "offer negotiation"'
    ];
    
    for (const query of searchQueries) {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: process.env.GOOGLE_API_KEY,
          cx: process.env.GOOGLE_CX_ID,
          q: query,
          num: 10
        }
      });
      
      if (!response.data.items || !response.data.items.length) {
        logger.warn(`No LeetCode content found for query: ${query}`);
        continue;
      }
      
      // Process and store content
      for (const item of response.data.items) {
        // Extract company name from title or snippet if available
        const companyMatches = (item.title + ' ' + item.snippet).match(/(Google|Amazon|Facebook|Microsoft|Apple|Netflix|Uber|Airbnb|LinkedIn|Twitter)/g);
        const companies = companyMatches ? [...new Set(companyMatches)] : [];
        
        // Determine categories based on query and content
        const categories = [];
        if (query.includes('interview')) categories.push('interview');
        if (query.includes('compensation')) categories.push('salary');
        if (query.includes('offer negotiation')) categories.push('discussion');
        
        // Create or update content
        const contentExists = await Content.findOne({ url: item.link });
        
        if (contentExists) {
          logger.info(`Content already exists: ${item.link}`);
          continue;
        }
        
        // Create new content
        const newContent = new Content({
          title: item.title,
          url: item.link,
          source: 'leetcode',
          snippet: item.snippet,
          date: new Date(item.pagemap?.metatags?.[0]?.['og:updated_time'] || Date.now()),
          categories,
          tags: companies,
          metadata: {
            companies
          }
        });
        
        await newContent.save();
        logger.info(`New LeetCode content saved: ${item.title}`);
        
        // Update tag counts
        for (const company of companies) {
          await Tag.findOneAndUpdate(
            { name: company },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
          );
        }
      }
    }
    
    logger.info('LeetCode content fetching completed');
  } catch (error) {
    logger.error('Error fetching LeetCode content:', error);
    throw error;
  }
};