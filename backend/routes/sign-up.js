const express = require('express');
const User = require('../models/User');
const Program = require('../models/Program');
const Exercise = require('../models/Exercise');
const bcrypt = require("bcrypt");
const slug = require("slug");

const router = express.Router();

const defaultPrograms = [
    { title: 'Full Body', no_of_days: 3, image: '../images/fullbody.png' },
    { title: 'Upper Lower', no_of_days: 4, image: '../images/upperlower.jpg'}
];

const defaultExercisesProgram1 = [
    { day: 1, title: 'Barbell Bench Press' },
    { day: 1, title: 'Barbell Squat' },
    { day: 2, title: 'Barbell Squat' },
    { day: 2, title: 'Barbell Bench' },
    { day: 3, title: 'Barbell Deadlift' },
    { day: 3, title: 'Brabell Overhead Press' },  
];

const defaultExercisesProgram2 = [
    { day: 1, title: 'Barbell Bench Press' },
    { day: 1, title: 'Barbell Squat' },
    { day: 2, title: 'Barbell Squat' },
    { day: 2, title: 'Barbell Bench' },
    { day: 3, title: 'Barbell Deadlift' },
    { day: 3, title: 'Brabell Overhead Press' },
    { day: 4, title: 'Barbell Bench' },
    { day: 4, title: 'Brabell Bench' },
];

router.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(404).json({ message: 'User already created' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        for (const defaultProgram of defaultPrograms) {
            // Saving default program
            defaultProgram.user_id = user._id;
            defaultProgram.slug = slug(defaultProgram.title);
            const program = new Program(defaultProgram);
            await program.save();

            // Saving default exercises
            const defaultExercises = defaultProgram.slug === 'full-body' ? defaultExercisesProgram1 : defaultExercisesProgram2;
            for (const [index, defaultExercise] of defaultExercises.entries()) {
                defaultExercise.user_id = user._id;
                defaultExercise.program_id = program._id;
                defaultExercise.min = 6;
                defaultExercise.max = 8;
                defaultExercise.order = index + 1;
                defaultExercise.week = 1;
                defaultExercise.increase_weight = 0;
                defaultExercise.sets = [
                    { weight: null, reps: null },
                    { weight: null, reps: null },
                    { weight: null, reps: null },
                    { weight: null, reps: null },
                ];
                const exercise = new Exercise(defaultExercise);
                await exercise.save();
            }
        }
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

module.exports = router;