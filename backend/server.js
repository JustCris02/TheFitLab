require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();


app.use(cors());
app.use(express.json());

app.use('/',workoutRoutes);

mongoose.connect(process.env.MONG_URL)
    .then(()=>{console.log("mongodb connected")})
    .catch((error)=>{
        console.log(error)
    })

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));