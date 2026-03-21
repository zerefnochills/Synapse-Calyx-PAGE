// ============================================
// INPUT VALIDATION MIDDLEWARE
// ============================================

const { body, validationResult } = require('express-validator');
const { SERVICE_TYPES, BUDGET_RANGES } = require('../models/Order');

/**
 * Validation rules for order submission
 */
const validateOrder = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters'),

  body('company')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),

  body('serviceType')
    .trim()
    .notEmpty()
    .withMessage('Service type is required')
    .isIn(SERVICE_TYPES)
    .withMessage(`Service type must be one of: ${SERVICE_TYPES.join(', ')}`),

  body('budget')
    .optional({ values: 'falsy' })
    .trim()
    .isIn(BUDGET_RANGES)
    .withMessage(`Budget must be one of: ${BUDGET_RANGES.join(', ')}`),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Project details are required')
    .isLength({ max: 5000 })
    .withMessage('Message cannot exceed 5000 characters'),
];

/**
 * Check validation results and return 400 if errors exist
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
    });
  }

  next();
};

module.exports = { validateOrder, handleValidationErrors };
