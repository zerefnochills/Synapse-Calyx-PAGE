const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/synapse_calyx');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log('------------------------------------------------');
        console.log('NOTE: MongoDB connection failed. Running in SIMULATION MODE.');
        console.log('Data will be printed to console and not saved.');
        console.log('------------------------------------------------');
        // We do NOT exit process here to keep the server running even without DB
    }
};

module.exports = connectDB;
