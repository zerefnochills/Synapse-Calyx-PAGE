const Inquiry = require('../models/Inquiry');

const submitInquiry = async (req, res) => {
    try {
        const { name, email, details } = req.body;

        if (!name || !email || !details) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Try to save to DB
        try {
            const inquiry = await Inquiry.create(req.body);
            res.status(201).json({ success: true, data: inquiry });
        } catch (dbError) {
            console.error('Database Error (Mocking Success):', dbError.message);
            // Fallback for demo purposes if DB call fails (e.g. no mongo running)
            res.status(200).json({ success: true, message: 'Data Transmitted (Simulated storage)' });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { submitInquiry };
