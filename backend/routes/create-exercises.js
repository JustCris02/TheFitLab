const express = require('express');
const Exercise = require('../models/Exercise');

const router = express.Router();

router.post('/api/exercises', async (req, res) => {
    const data = req.body;
    try {
        const exercise = await Exercise(data);
        await exercise.save();
        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Error getting programs' });
    }
});

module.exports = router;