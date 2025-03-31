// server/src/utils/asyncHandler.js
// Middleware to handle async/await errors in Express routes
exports.asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  
  // server/src/utils/errorHandler.js
  const { logger } = require('./logger');
  
  // Custom error handler middleware
  exports.errorHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    
    // If in development, include stack trace
    const error = {
      success: false,
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
    
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json(error);
  };