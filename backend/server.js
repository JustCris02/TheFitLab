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

app.use('/', login);
app.use('/', signUp);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

