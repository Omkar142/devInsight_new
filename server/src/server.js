// This file is intentionally left blank.
// server/src/server.js
require('dotenv').config();
const app = require('./app');
const { initScheduledJobs } = require('./services/scheduler');
const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Initialize scheduled jobs for data fetching
  initScheduledJobs();
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // Close server & exit process
  process.exit(1);
});