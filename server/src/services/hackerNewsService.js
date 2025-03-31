// server/src/services/hackerNewsService.js
const axios = require('axios');
const Content = require('../models/Content');
const { logger } = require('../utils/logger');

exports.fetchHackerNewsContent = async () => {
  logger.info('Fetching Hacker News content');
  
  try {
    // Get top stories from Hacker News API
    const topStoriesResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    
    if (!topStoriesResponse.data || !topStoriesResponse.data.length) {
      logger.warn('No Hacker News top stories found');
      return;
    }
    
    // Get details for top 30 stories
    const storyIds = topStoriesResponse.data.slice(0, 30);
    
    for (const storyId of storyIds) {
      const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
      
      if (!storyResponse.data || !storyResponse.data.title) {
        continue;
      }
      
      const story = storyResponse.data;
      
      // Skip job postings and stories with no URL
      if (story.type === 'job' || !story.url) {
        continue;
      }
      
      // Determine categories based on title and content
      const categories = [];
      const title = story.title.toLowerCase();
      
      if (title.includes('interview') || title.includes('hiring')) categories.push('interview');
      if (title.includes('salary') || title.includes('compensation')) categories.push('salary');
      if (title.includes('review')) categories.push('review');
      if (title.includes('layoff') || title.includes('fired')) categories.push('news');
      
      // Default to tech news if no specific category
      if (categories.length === 0) categories.push('tech');
      
      // Extract tags
      const tagMatches = story.title.match(/(Google|Amazon|Facebook|Microsoft|Apple|Netflix|Uber|Airbnb|LinkedIn|Twitter|React|JavaScript|Python|Java|C\+\+|AI|ML)/g);
      const tags = tagMatches ? [...new Set(tagMatches)] : [];
      
      // Create or update content
      const contentExists = await Content.findOne({ url: story.url });
      
      if (contentExists) {
        logger.info(`Content already exists: ${story.title}`);
        continue;
      }
      
      // Create new content
            const newContent = new Content({
              title: story.title,
              url: story.url,
              source: 'hackernews',
              snippet: story.text ? story.text.substring(0, 300) + (story.text.length > 300 ? '...' : '') : 'No description available',
              date: new Date(),
              categories,
              tags
            });
      
            await newContent.save();
          }
        } catch (error) {
          logger.error('Error fetching Hacker News content:', error);
        }
      };