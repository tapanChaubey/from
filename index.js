// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Create a schema for the form data
const formDataSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    adharNo: String,
    phoneNumber: String,
    filename: String // Assuming you want to store the file name only
});

const FormData = mongoose.model('FormData', formDataSchema);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle form submission
app.post('/getdata', (req, res) => {
    const formData = new FormData({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        dateOfBirth: req.body.date,
        adharNo: req.body.adhar,
        phoneNumber: req.body.phone,
        filename: req.body.filename // Assuming you're storing the file name only
    });

    // Save form data to MongoDB
    formData.save()
        .then(() => res.send('Form data saved successfully'))
        .catch(err => console.log(err));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
