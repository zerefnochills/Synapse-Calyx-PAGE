// ============================================
// SYNAPSE CALYX — SERVER ENTRY POINT
// ============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { rateLimit } = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const orderRoutes = require('./routes/orders');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// ============================================
// SECURITY
// ============================================

app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:3000',
    ];
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-key'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use(limiter);

// Stricter rate limit for order submissions
const orderSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 submissions per hour per IP
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});

// ============================================
// PARSERS & UTILITIES
// ============================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'Synapse Calyx API',
    status: 'operational',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// API ROUTES
// ============================================

app.use('/api/orders', orderRoutes(orderSubmitLimiter));

// ============================================
// ERROR HANDLING
// ============================================

app.use(notFound);
app.use(errorHandler);

// ============================================
// DATABASE & SERVER START
// ============================================

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/synapse-calyx';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`✓ Synapse server running on port ${PORT}`);
      console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`  API:         http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error('✗ MongoDB connection failed:', err.message);
    console.error('  Make sure MongoDB is running or check MONGODB_URI in .env');
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = app;
