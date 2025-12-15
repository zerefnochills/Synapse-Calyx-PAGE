const express = require('express');
const router = express.Router();
const { getStatus, getHealth } = require('../controllers/statusController');

router.get('/status', getStatus);
router.get('/health', getHealth);

module.exports = router;
