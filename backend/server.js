const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Database Connection
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully.'))
.catch(err => console.error('Database connection failed:', err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const login = require('./routes/Login');
const signUp = require('./routes/sign-up');
const getPrograms = require("./routes/get-programs");
const savePrograms = require("./routes/save-programs");
const getExercises = require('./routes/get-exercises');
const getProgram = require('./routes/get-program')
const createExercise = require('./routes/create-exercises')
const updateSet = require('./routes/update-set-exercises')
const removeExercises = require('./routes/remove-exercises')
const updateExercises = require('./routes/update-exercises')

app.use('/', login);
app.use('/', signUp);
app.use('/', getPrograms);
app.use('/', savePrograms);
app.use('/', getExercises);
app.use('/', getProgram);
app.use('/',createExercise);
app.use('/',updateSet);
app.use('/',removeExercises);
app.use('/',updateExercises);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

