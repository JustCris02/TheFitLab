const express = require('express');
const Program = require('../models/Program');
const slug = require("slug");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post('/api/programs', upload.single('image'), async (req, res) => {
    const user_id = req.body.user_id;
    const title = req.body.title;
    const no_of_days = req.body.no_of_days;
    const programSlug = slug(title);
    const imageName = req.file.filename;
    try {
        const program = new Program({
            user_id,
            title,
            slug: programSlug,
            no_of_days,
            image: '../images/' + imageName
        });
        await program.save();
        res.status(201).json({ message: 'Program created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating programs' });
    }
});

module.exports = router;