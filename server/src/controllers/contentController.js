// server/src/controllers/contentController.js
const Content = require('../models/Content');
const { asyncHandler } = require('../utils/asyncHandler');

// @desc    Get all content with pagination
// @route   GET /api/content
exports.getAllContent = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  const content = await Content.find()
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Content.countDocuments();
  
  res.status(200).json({
    success: true,
    count: content.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: content
  });
});

// @desc    Filter content
// @route   GET /api/content/filter
exports.filterContent = asyncHandler(async (req, res) => {
  const { source, category, tag } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  // Build filter
  const filter = {};
  
  if (source) {
    filter.source = source;
  }
  
  if (category) {
    filter.categories = category;
  }
  
  if (tag) {
    filter.tags = tag;
  }
  
  const content = await Content.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Content.countDocuments(filter);
  
  res.status(200).json({
    success: true,
    count: content.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: content
  });
});

// @desc    Search content
// @route   GET /api/content/search
exports.searchContent = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a search query'
    });
  }
  
  const content = await Content.find(
    { $text: { $search: q } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' }, date: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Content.countDocuments({ $text: { $search: q } });
  
  res.status(200).json({
    success: true,
    count: content.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: content
  });
});

// @desc    Get content by ID
// @route   GET /api/content/:id
exports.getContentById = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  
  if (!content) {
    return res.status(404).json({
      success: false,
      message: 'Content not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: content
  });
});
