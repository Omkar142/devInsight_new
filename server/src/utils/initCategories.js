// server/src/utils/initCategories.js
const Category = require('../models/Category');
const { logger } = require('./logger');

// Initialize default categories
exports.initCategories = async () => {
  try {
    const categories = [
      {
        name: 'interview',
        displayName: 'Interview Experiences',
        description: 'Experiences and preparation for technical interviews'
      },
      {
        name: 'salary',
        displayName: 'Salary Data',
        description: 'Compensation information and negotiation'
      },
      {
        name: 'review',
        displayName: 'Company Reviews',
        description: 'Reviews of companies and work-life balance'
      },
      {
        name: 'news',
        displayName: 'Tech News',
        description: 'Latest news in the tech industry'
      },
      {
        name: 'hiring',
        displayName: 'Hiring Now',
        description: 'Companies currently hiring'
      },
      {
        name: 'tech',
        displayName: 'Tech Stack',
        description: 'Discussions about technologies and tools'
      },
      {
        name: 'discussion',
        displayName: 'Discussions',
        description: 'General discussions about tech careers'
      }
    ];
    
    for (const category of categories) {
      await Category.findOneAndUpdate(
        { name: category.name },
        category,
        { upsert: true, new: true }
      );
    }
    
    logger.info('Categories initialized');
  } catch (error) {
    logger.error('Error initializing categories:', error);
    throw error;
  }
};