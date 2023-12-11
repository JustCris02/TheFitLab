const express = require('express');
const Program = require('../models/Program');

const router = express.Router();

router.get('/api/program/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const program = await Program.findById(id);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }
        res.json(program);
    } catch (error) {
        res.status(500).json({ message: 'Error getting program' });
    }
});

module.exports = router;