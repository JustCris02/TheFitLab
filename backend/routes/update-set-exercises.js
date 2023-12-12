const express = require('express');
const Exercise = require('../models/Exercise');

const router = express.Router();

router.post('/api/exercises/:id/update/sets', async (req, res) => {
    const exerciseId = req.params.id;
    const { sets } = req.body;
    try {
        await Exercise.updateOne({ _id: exerciseId }, { sets });
        res.status(201).json({ message: 'Exercise updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in update exercise' });
    }
});

module.exports = router;