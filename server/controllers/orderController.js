// ============================================
// ORDER CONTROLLER — Business Logic
// ============================================

const Order = require('../models/Order');
const { AppError, catchAsync } = require('../middleware/errorHandler');
const { sendNewOrderNotification, sendOrderConfirmation } = require('../utils/emailService');
const fs = require('fs');
const path = require('path');

/**
 * POST /api/orders
 * Submit a new client order (public)
 */
const createOrder = catchAsync(async (req, res) => {
  const { name, email, phone, company, serviceType, budget, message } = req.body;

  // Build attachments array from uploaded files
  const attachments = req.files
    ? req.files.map((file) => ({
        originalName: file.originalname,
        filename: file.filename,
        path: `/uploads/${file.filename}`,
        mimeType: file.mimetype,
        size: file.size,
      }))
    : [];

  const order = await Order.create({
    name,
    email,
    phone,
    company,
    serviceType,
    budget,
    message,
    attachments,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
  });

  // Send email notifications (async, non-blocking)
  sendNewOrderNotification(order).catch(() => {});
  sendOrderConfirmation(order).catch(() => {});

  res.status(201).json({
    success: true,
    message: 'Your order has been submitted successfully! We will get back to you soon.',
    data: {
      orderId: order.orderId,
      name: order.name,
      serviceType: order.serviceType,
      status: order.status,
      createdAt: order.createdAt,
    },
  });
});

/**
 * GET /api/orders
 * Get all orders with optional filters (admin only)
 */
const getOrders = catchAsync(async (req, res) => {
  const {
    status,
    serviceType,
    search,
    page = 1,
    limit = 20,
    sort = '-createdAt',
  } = req.query;

  const query = {};

  if (status) query.status = status;
  if (serviceType) query.serviceType = serviceType;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [orders, total] = await Promise.all([
    Order.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-ipAddress -userAgent -__v'),
    Order.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    },
  });
});

/**
 * GET /api/orders/stats
 * Get order statistics (admin only)
 */
const getOrderStats = catchAsync(async (req, res) => {
  const [statusCounts, serviceCounts, total, thisMonth] = await Promise.all([
    Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Order.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Order.countDocuments(),
    Order.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    }),
  ]);

  // Convert arrays to objects
  const byStatus = {};
  statusCounts.forEach((s) => (byStatus[s._id] = s.count));

  const byService = {};
  serviceCounts.forEach((s) => (byService[s._id] = s.count));

  res.json({
    success: true,
    data: {
      total,
      thisMonth,
      byStatus,
      byService,
    },
  });
});

/**
 * GET /api/orders/:id
 * Get a single order by ID (admin only)
 */
const getOrder = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id).select('-__v');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  res.json({
    success: true,
    data: order,
  });
});

/**
 * PATCH /api/orders/:id
 * Update order status and/or admin notes (admin only)
 */
const updateOrder = catchAsync(async (req, res) => {
  const { status, adminNotes } = req.body;
  const updateData = {};

  if (status) {
    const { ORDER_STATUSES } = require('../models/Order');
    if (!ORDER_STATUSES.includes(status)) {
      throw new AppError(
        `Invalid status. Must be one of: ${ORDER_STATUSES.join(', ')}`,
        400
      );
    }
    updateData.status = status;
  }

  if (adminNotes !== undefined) {
    updateData.adminNotes = adminNotes;
  }

  const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  }).select('-__v');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  res.json({
    success: true,
    message: 'Order updated successfully',
    data: order,
  });
});

/**
 * DELETE /api/orders/:id
 * Delete an order and its uploaded files (admin only)
 */
const deleteOrder = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Delete attached files from disk
  if (order.attachments?.length) {
    order.attachments.forEach((attachment) => {
      const filePath = path.join(__dirname, '..', attachment.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }

  await Order.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Order deleted successfully',
  });
});

module.exports = {
  createOrder,
  getOrders,
  getOrderStats,
  getOrder,
  updateOrder,
  deleteOrder,
};
