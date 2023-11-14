const mongoose = require('mongoose');
const exerciseSchema = require('./Exercise')


const workoutSchema = new mongoose.Schema({
    week:Number,
    day:Number,
    exercise:[exerciseSchema]
});

const Workout = mongoose.model('Workout',workoutSchema);
module.exports = Workout;