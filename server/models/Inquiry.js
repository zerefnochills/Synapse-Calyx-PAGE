const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    company: { type: String },
    position: { type: String },
    roleType: { type: String },
    projectType: { type: String },
    details: { type: String, required: true },
    budget: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
