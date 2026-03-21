// ============================================
// ADMIN AUTH MIDDLEWARE
// ============================================

const { AppError } = require('./errorHandler');

/**
 * Simple API key authentication for admin endpoints.
 * Expects header: x-admin-key: <ADMIN_API_KEY>
 */
const requireAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    console.warn('WARNING: ADMIN_API_KEY is not set in environment variables.');
    return next(new AppError('Server configuration error: admin key not set', 500));
  }

  if (!adminKey) {
    return next(new AppError('Access denied. Missing admin API key.', 401));
  }

  if (adminKey !== expectedKey) {
    return next(new AppError('Access denied. Invalid admin API key.', 403));
  }

  next();
};

module.exports = { requireAdmin };
