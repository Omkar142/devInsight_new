// server/src/services/scheduler.js
const cron = require('node-cron');
const { logger } = require('../utils/logger');
const leetcodeService = require('./leetcodeService');
const redditService = require('./redditService');
const stackOverflowService = require('./stackOverflowService');
const hackerNewsService = require('./hackerNewsService');
const newsService = require('./newsService');

// Initialize all scheduled jobs
const initScheduledJobs = () => {
  // Schedule LeetCode content fetching every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    logger.info('Running scheduled job: Fetching LeetCode content');
    try {
      await leetcodeService.fetchLeetCodeContent();
    } catch (err) {
      logger.error('Error fetching LeetCode content:', err);
    }
  });

  // Schedule Reddit content fetching every 20 minutes
  cron.schedule('*/20 * * * *', async () => {
    logger.info('Running scheduled job: Fetching Reddit content');
    try {
      await redditService.fetchRedditContent();
    } catch (err) {
      logger.error('Error fetching Reddit content:', err);
    }
  });

  // Schedule Stack Overflow content fetching every 2 hours
  cron.schedule('0 */2 * * *', async () => {
    logger.info('Running scheduled job: Fetching Stack Overflow content');
    try {
      await stackOverflowService.fetchStackOverflowContent();
    } catch (err) {
      logger.error('Error fetching Stack Overflow content:', err);
    }
  });

  // Schedule Hacker News content fetching every 1 hour
  cron.schedule('0 */1 * * *', async () => {
    logger.info('Running scheduled job: Fetching Hacker News content');
    try {
      await hackerNewsService.fetchHackerNewsContent();
    } catch (err) {
      logger.error('Error fetching Hacker News content:', err);
    }
  });

  // Schedule News content fetching every 3 hours
  cron.schedule('0 */3 * * *', async () => {
    logger.info('Running scheduled job: Fetching News content');
    try {
      await newsService.fetchNewsContent();
    } catch (err) {
      logger.error('Error fetching News content:', err);
    }
  });
  
  logger.info('All scheduled jobs initialized');
};

module.exports = { initScheduledJobs };