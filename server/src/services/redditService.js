// server/src/services/redditService.js
const axios = require('axios');
const Content = require('../models/Content');
const Tag = require('../models/Tag');
const { logger } = require('../utils/logger');

exports.fetchRedditContent = async () => {
  logger.info('Fetching Reddit content');
  
  try {
    const subreddits = [
      'cscareerquestions',
      'programming',
      'technology',
      'ExperiencedDevs',
      'webdev'
    ];
    
    for (const subreddit of subreddits) {
      // Using Reddit JSON API (public, no auth required for read-only)
      const response = await axios.get(
        `https://www.reddit.com/r/${subreddit}/hot.json`,
        {
          headers: {
            'User-Agent': 'DevInsightClone/1.0.0'
          },
          params: {
            limit: 25
          }
        }
      );
      
      if (!response.data.data.children || !response.data.data.children.length) {
        logger.warn(`No Reddit content found for subreddit: ${subreddit}`);
        continue;
      }
      
      // Process and store content
      for (const post of response.data.data.children) {
        const { data } = post;
        
        // Skip posts that are stickied or have no content
        if (data.stickied || !data.title) {
          continue;
        }
        
        // Determine categories based on subreddit and content
        const categories = [];
        if (subreddit === 'cscareerquestions') categories.push('discussion');
        if (data.title.toLowerCase().includes('interview')) categories.push('interview');
        if (data.title.toLowerCase().includes('salary') || data.title.toLowerCase().includes('compensation')) categories.push('salary');
        if (data.title.toLowerCase().includes('review')) categories.push('review');
        
        // Extract tags from title
        const tagMatches = data.title.match(/(Google|Amazon|Facebook|Microsoft|Apple|Netflix|Uber|Airbnb|LinkedIn|Twitter|React|JavaScript|Python|Java|C\+\+)/g);
        const tags = tagMatches ? [...new Set(tagMatches)] : [];
        
        // Create or update content
        const contentExists = await Content.findOne({ url: `https://www.reddit.com${data.permalink}` });
        
        if (contentExists) {
          logger.info(`Content already exists: ${data.title}`);
          continue;
        }
        
        // Create new content
        const newContent = new Content({
          title: data.title,
          url: `https://www.reddit.com${data.permalink}`,
          source: 'reddit',
          snippet: data.selftext.substring(0, 300) + (data.selftext.length > 300 ? '...' : ''),
          date: new Date(data.created_utc * 1000),
          categories: categories.length ? categories : ['discussion'],
          tags,
          metadata: {
            subreddit: data.subreddit,
            upvotes: data.ups,
            downvotes: data.downs,
            numComments: data.num_comments
          }
        });
        
        await newContent.save();
        logger.info(`New Reddit content saved: ${data.title}`);
        
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
    
    logger.info('Reddit content fetching completed');
  } catch (error) {
    logger.error('Error fetching Reddit content:', error);
    throw error;
  }
};