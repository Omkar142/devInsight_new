// server/src/api/routes/tagRoutes.js
const express = require('express');
const tagController = require('../../controllers/tagController');
const router = express.Router();

// GET /api/tags
router.get('/', tagController.getAllTags);

module.exports = router;