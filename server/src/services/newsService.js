// server/src/services/newsService.js
const axios = require('axios');
const Content = require('../models/Content');
const Tag = require('../models/Tag');
const { logger } = require('../utils/logger');

exports.fetchNewsContent = async () => {
  logger.info('Fetching News content');
  
  try {
    const keywords = [
      'tech layoffs',
      'hiring freeze',
      'FAANG',
      'tech salaries',
      'tech trends',
      'software engineering jobs'
    ];
    
    for (const keyword of keywords) {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: keyword,
          domains: 'techcrunch.com,theverge.com,wired.com,arstechnica.com,zdnet.com',
          sortBy: 'publishedAt',
          language: 'en',
          pageSize: 10,
          apiKey: process.env.NEWS_API_KEY
        }
      });
      
      if (!response.data.articles || !response.data.articles.length) {
        logger.warn(`No News content found for keyword: ${keyword}`);
        continue;
      }
      
      // Process and store content
      for (const article of response.data.articles) {
        // Skip articles with no title or url
        if (!article.title || !article.url) {
          continue;
        }
        
        // Determine categories based on keyword and content
        const categories = [];
        if (keyword.includes('layoffs') || keyword.includes('hiring freeze')) categories.push('news');
        if (keyword.includes('salaries')) categories.push('salary');
        if (keyword.includes('trends')) categories.push('tech');
        if (keyword.includes('jobs')) categories.push('hiring');
        
        // Default to tech news if no specific category
        if (categories.length === 0) categories.push('news');
        
        // Extract tags from title and description
        const titleAndDesc = `${article.title} ${article.description || ''}`;
        const tagMatches = titleAndDesc.match(/(Google|Amazon|Facebook|Microsoft|Apple|Netflix|Uber|Airbnb|LinkedIn|Twitter|React|JavaScript|Python|Java|C\+\+|AI|ML)/g);
        const tags = tagMatches ? [...new Set(tagMatches)] : [];
        
        // Create or update content
        const contentExists = await Content.findOne({ url: article.url });
        
        if (contentExists) {
          logger.info(`Content already exists: ${article.title}`);
          continue;
        }
        
        // Create new content
        const newContent = new Content({
          title: article.title,
          url: article.url,
          source: 'news',
          snippet: article.description || article.content || 'No description available',
          date: new Date(article.publishedAt),
          categories,
          tags,
          metadata: {
            source: article.source.name,
            author: article.author
          }
        });
        
        await newContent.save();
        logger.info(`New News content saved: ${article.title}`);
        
        // Update tag counts
        for (const tag of tags) {
          await Tag.findOneAndUpdate(
            { name: tag },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
          );
        }
      }
    }
    
    logger.info('News content fetching completed');
  } catch (error) {
    logger.error('Error fetching News content:', error);
    throw error;
  }
};