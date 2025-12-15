const getStatus = (req, res) => {
    const isMaintenance = process.env.MAINTENANCE_MODE === 'true';
    res.json({
        maintenance: isMaintenance,
        message: isMaintenance ? 'System Offline for Upgrades' : 'System Online'
    });
};

const getHealth = (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
};

module.exports = { getStatus, getHealth };
