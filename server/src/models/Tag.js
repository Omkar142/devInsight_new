// server/src/models/Tag.js
const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  count: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;