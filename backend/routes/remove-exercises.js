const express = require('express');
const Exercise = require('../models/Exercise');

const router = express.Router();

router.post('/api/exercises/:id/remove', async (req, res) => {
    const exerciseId = req.params.id;
    try {
        const removedExercise = await Exercise.findByIdAndDelete(exerciseId);
        if (!removedExercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json({ message: 'Exercise removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing exercise' });
    }
});

module.exports = router;