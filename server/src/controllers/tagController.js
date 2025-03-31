// server/src/controllers/tagController.js
const Tag = require('../models/Tag');
const { asyncHandler } = require('../utils/asyncHandler');

// @desc    Get all tags
// @route   GET /api/tags
exports.getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find().sort({ count: -1 }).limit(100);
  
  res.status(200).json({
    success: true,
    count: tags.length,
    data: tags
  });
});