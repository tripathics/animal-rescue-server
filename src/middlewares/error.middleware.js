import logger from '../config/logger.config.js';

export const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    message: `Not Found - ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  let statusCode = err.statusCode || 500;
  let { message } = err;

  logger.error(err.message);

  if (process.env.NODE_ENV === 'development')
    logger.error(err.stack);

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
