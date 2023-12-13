const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    user_id: String,
    program_id: String,
    day: Number,
    title: String,
    min: Number,
    max: Number,
    order: Number,
    week: Number,
    increase_weight: Number,
    sets: [{ reps: Number, weight: Number }],
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
