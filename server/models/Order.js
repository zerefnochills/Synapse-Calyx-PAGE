// ============================================
// ORDER MODEL — MongoDB Schema
// ============================================

const mongoose = require('mongoose');

const SERVICE_TYPES = [
  'Video Editing',
  'Motion Graphics',
  'Web Development',
  'Graphic Design',
  'Automation',
  'Advertising',
  'Other',
];

const BUDGET_RANGES = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Not Sure',
];

const ORDER_STATUSES = ['new', 'in-review', 'accepted', 'rejected', 'completed'];

const orderSchema = new mongoose.Schema(
  {
    // Client info
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },

    // Project info
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      enum: {
        values: SERVICE_TYPES,
        message: 'Invalid service type: {VALUE}',
      },
    },
    budget: {
      type: String,
      enum: {
        values: BUDGET_RANGES,
        message: 'Invalid budget range: {VALUE}',
      },
    },
    message: {
      type: String,
      required: [true, 'Project details are required'],
      trim: true,
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },

    // File attachments (stored file paths)
    attachments: [
      {
        originalName: String,
        filename: String,
        path: String,
        mimeType: String,
        size: Number,
      },
    ],

    // Order management
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'new',
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Admin notes cannot exceed 2000 characters'],
    },

    // Tracking
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Index for common queries
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ email: 1 });

// Virtual for formatted order ID (e.g., "SYN-00042")
orderSchema.virtual('orderId').get(function () {
  // Use last 5 chars of _id for a short readable ID
  return `SYN-${this._id.toString().slice(-5).toUpperCase()}`;
});

// Ensure virtuals are included in JSON output
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema);
module.exports.SERVICE_TYPES = SERVICE_TYPES;
module.exports.BUDGET_RANGES = BUDGET_RANGES;
module.exports.ORDER_STATUSES = ORDER_STATUSES;
