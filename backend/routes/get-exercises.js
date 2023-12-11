const express = require('express');
const Exercise = require('../models/Exercise');

const router = express.Router();

router.get('/api/program/:program_id/exercises', async (req, res) => {
    const { program_id } = req.params;
    try {
        const exercises = await Exercise.find({ program_id });
        if (!exercises) {
            return res.status(404).json({ message: 'exercises not found' });
        }
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: 'Error getting program' });
    }
});

module.exports = router;