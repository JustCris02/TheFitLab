const express = require ('express');
const Workout = require("../models/Workout");

const router = express.Router();

router.post('/api/workouts', async(req,res)=>{
    const {week,day,exercises}= req.body;

    const newWorkout = new Workout({
        week,
        day,
        exercises
    });
    try{
        const savedWorkout = await newWorkout.save();
        res.status(200).json(savedWorkout);
    }catch(error){
        res.status(400).json({ message: err.message });
    }
});

module.exports=router;