const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    no_of_days: { type: Number, required: true },
    image: String,
});

module.exports = mongoose.model('Program', programSchema);
