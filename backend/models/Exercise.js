const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    user_id: String,
    program_id: String,
    day: Number,
    title: String,
    min: Number,
    max: Number,
    order: Number,
    weak: Number,
    sets: Array,
    no_of_sets: Number
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
