const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    weight: Number,
    reps:Number,
    reachedMaxRep:{
        type:Boolean,
        default:false
    }
});

module.exports=setSchema;
