// server/src/services/stackOverflowService.js
const axios = require('axios');
const Content = require('../models/Content');
const Tag = require('../models/Tag');
const { logger } = require('../utils/logger');

exports.fetchStackOverflowContent = async () => {
  logger.info('Fetching Stack Overflow content');
  
  try {
    const tags = [
      'java',
      'python',
      'javascript',
      'c++',
      'algorithms',
      'data-structures',
      'system-design'
    ];
    
    for (const tag of tags) {
      // Using Stack Exchange API
      const response = await axios.get(
        'https://api.stackexchange.com/2.3/questions',
        {
          params: {
            site: 'stackoverflow',
            tagged: tag,
            sort: 'activity',
            order: 'desc',
            filter: '!-*jbN*LnFBHR',
            key: process.env.STACK_EXCHANGE_KEY
          }
        }
      );
      
      if (!response.data.items || !response.data.items.length) {
        logger.warn(`No Stack Overflow content found for tag: ${tag}`);
        continue;
      }
      
      // Process and store content
      for (const item of response.data.items) {
        // Skip closed questions
        if (item.closed_date) {
          continue;
        }
        
        // Create or update content
        const contentExists = await Content.findOne({ url: item.link });
        
        if (contentExists) {
          logger.info(`Content already exists: ${item.title}`);
          continue;
        }
        
        // Create new content
        const newContent = new Content({
          title: item.title,
          url: item.link,
          source: 'stackoverflow',
          snippet: item.body_markdown ? item.body_markdown.substring(0, 300) + (item.body_markdown.length > 300 ? '...' : '') : 'No description available',
          date: new Date(item.creation_date * 1000),
          categories: ['tech'],
          tags: item.tags,
          metadata: {
            score: item.score,
            viewCount: item.view_count,
            answerCount: item.answer_count,
            isAnswered: item.is_answered
          }
        });
        
        await newContent.save();
        logger.info(`New Stack Overflow content saved: ${item.title}`);
        
        // Update tag counts
        for (const itemTag of item.tags) {
          await Tag.findOneAndUpdate(
            { name: itemTag },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
          );
        }
      }
    }
    
    logger.info('Stack Overflow content fetching completed');
  } catch (error) {
    logger.error('Error fetching Stack Overflow content:', error);
    throw error;
  }
};