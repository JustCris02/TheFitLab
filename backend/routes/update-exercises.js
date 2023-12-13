const express = require('express');
const Exercise = require('../models/Exercise');
const Program = require('../models/Program');

const router = express.Router();

router.post('/api/exercises/update', async (req, res) => {
    const { exercises } = req.body

    try {

        for (let i = 0; i < exercises.length; i++) {
            const exercise = exercises[i];
            const { increase_weight, sets } = exercise;
            await Exercise.updateOne({ _id: exercise._id }, { increase_weight, sets });
        }

        // Copy exercises if last day
        const program = await Program.findById(exercises[0].program_id);
        if (program.no_of_days === exercises[0].day) {

            // Check if next week already exists, then return it
            const isExists = await Exercise.findOne({
                week: exercises[0].week + 1,
                user_id: exercises[0].user_id,
                program_id: exercises[0].program_id
            });
            if (isExists) {
                res.status(201).json({ message: 'Exercise updated successfully' });
                return;
            }

            // Let's copy all exercises from previous week
            let copyExercises = await Exercise.find({
                week: exercises[0].week,
                user_id: exercises[0].user_id,
                program_id: exercises[0].program_id
            });

            copyExercises = copyExercises.map(copyExercise => {
                // Put copy into next week
                copyExercise.week = copyExercise.week + 1;
            
                let shouldIncreaseWeight = true;
            
                // Check if all sets meet the condition for increasing weight
                copyExercise.sets.forEach(set => {
                    if (set.reps < copyExercise.max) {
                        shouldIncreaseWeight = false;
                    }
                });
            
                // Increase weight if the condition is met and reset reps
                copyExercise.sets = copyExercise.sets.map(set => {
                    if (shouldIncreaseWeight && copyExercise.increase_weight > 0) {
                        return { ...set, weight: set.weight + copyExercise.increase_weight, reps: null };
                    } else {
                        return { ...set, reps: null };
                    }
                });
            
                copyExercise._id = undefined; // Remove the _id field for new document creation
                return copyExercise;
            });

            await Exercise.insertMany(copyExercises);
        }

        res.status(201).json({ message: 'Exercise updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in update exercise' });
    }
});

module.exports = router;