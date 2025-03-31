// server/src/models/Content.js
const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  source: {
    type: String,
    required: true,
    enum: ['leetcode', 'reddit', 'stackoverflow', 'hackernews', 'news']
  },
  snippet: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  categories: [{
    type: String,
    enum: ['interview', 'salary', 'review', 'news', 'hiring', 'tech', 'discussion']
  }],
  tags: [{
    type: String
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // For Reddit: subreddit, upvotes, downvotes
  // For StackOverflow: vote count, view count
  // For LeetCode: company mentions
  // For News: publisher name
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for efficient filtering and searching
ContentSchema.index({ source: 1 });
ContentSchema.index({ categories: 1 });
ContentSchema.index({ tags: 1 });
ContentSchema.index({ date: -1 });
ContentSchema.index({ title: 'text', snippet: 'text' });

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;