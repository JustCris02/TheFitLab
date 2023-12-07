const express = require('express');
const Program = require('../models/Program');

const router = express.Router();

router.get('/api/programs', async (req, res) => {
    const { user_id } = req.query;
    try {
        const programs = await Program.find({ user_id });
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: 'Error getting programs' });
    }
});

module.exports = router;