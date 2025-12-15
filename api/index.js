const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../server/config/db');

// Load config - Vercel will use environment variables directly
dotenv.config({ path: '../server/.env' });

// Initialize database connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const statusRoutes = require('../server/routes/statusRoutes');
const contactRoutes = require('../server/routes/contactRoutes');

// Routes - No /api prefix needed, Vercel routes /api/* to this function
app.use('/', statusRoutes);
app.use('/contact', contactRoutes);

// Export for Vercel serverless
module.exports = app;
