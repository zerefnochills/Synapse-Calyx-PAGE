// ============================================
// ORDER ROUTES
// ============================================

const express = require('express');
const { requireAdmin } = require('../middleware/auth');
const { validateOrder, handleValidationErrors } = require('../middleware/validate');
const upload = require('../middleware/upload');
const {
  createOrder,
  getOrders,
  getOrderStats,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

/**
 * Factory function — accepts the order submission rate limiter
 */
module.exports = (orderSubmitLimiter) => {
  const router = express.Router();

  // ─── Public ────────────────────────────────────
  // POST /api/orders — Submit a new order
  router.post(
    '/',
    orderSubmitLimiter,
    upload.array('attachments', 5),
    validateOrder,
    handleValidationErrors,
    createOrder
  );

  // ─── Admin (requires x-admin-key header) ──────
  // GET /api/orders — List all orders
  router.get('/', requireAdmin, getOrders);

  // GET /api/orders/stats — Order statistics
  router.get('/stats', requireAdmin, getOrderStats);

  // GET /api/orders/:id — Single order details
  router.get('/:id', requireAdmin, getOrder);

  // PATCH /api/orders/:id — Update order status/notes
  router.patch('/:id', requireAdmin, updateOrder);

  // DELETE /api/orders/:id — Delete an order
  router.delete('/:id', requireAdmin, deleteOrder);

  return router;
};
