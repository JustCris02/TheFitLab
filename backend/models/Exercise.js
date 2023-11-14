const mongoose = require('mongoose');
const setSchema = require('./Set');

const exerciseSchema = new mongoose.Schema({
    name:String,
    sets:[setSchema]
});

module.exports=exerciseSchema;