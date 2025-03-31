const express = require('express');
const router = express.Router();
const Content = require('../../models/Content');
const { fetchGoogleResults } = require('../../services/googleService');
const { logger } = require('../../utils/logger');

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    let query = {};
    
    // Category-specific queries
    if (category) {
      query = { 
        categories: category,
        // Ensure we're getting the right type of content
        $or: category === 'salary' ? [
          { title: { $regex: /compensation|salary|tc|offer/i } }
        ] : category === 'interview' ? [
          { title: { $regex: /interview|onsite|coding/i } }
        ] : []
      };
    }

    let contents = await Content.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // If fetching first page or no content, get fresh content
    if (page === 1 || contents.length === 0) {
      const freshContent = await fetchGoogleResults();
      if (freshContent.length) {
        await Content.insertMany(freshContent, { ordered: false })
          .catch(err => logger.warn('Some documents already exist'));
        
        contents = await Content.find(query)
          .sort({ date: -1 })
          .skip(skip)
          .limit(limit)
          .lean();
      }
    }

    res.status(200).json(contents);
  } catch (error) {
    logger.error('Content fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add new endpoint for category-specific content
router.get('/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const contents = await Content.find({ categories: category })
      .sort({ date: -1 })
      .limit(10)
      .lean();

    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
