const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load config
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api', require('./routes/statusRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Synapse Server running on port ${PORT}`));
