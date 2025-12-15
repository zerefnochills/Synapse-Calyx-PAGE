// Vercel Serverless Function for API endpoints
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Status endpoint - checks maintenance mode
app.get('/api/status', (req, res) => {
    const isMaintenance = process.env.MAINTENANCE_MODE === 'true';
    res.json({
        maintenance: isMaintenance,
        message: isMaintenance ? 'System Offline for Upgrades' : 'System Online'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Contact endpoint - simplified for now (no DB dependency)
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, projectType, budget, message } = req.body;

        // Log the inquiry (in production, this would save to database)
        console.log('Contact Form Submission:', {
            name,
            email,
            company,
            projectType,
            budget,
            timestamp: new Date()
        });

        // For now, just return success
        // TODO: Add MongoDB connection when needed
        res.json({
            success: true,
            message: 'Thank you for your inquiry! We will get back to you soon.'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit inquiry. Please try again.'
        });
    }
});

// Export for Vercel serverless
module.exports = app;
