const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app=express();

//setup routes
const patients = require('./routes/patients');
const alerts=require('./routes/alerts');
const exercises=require('./routes/exercises');
const vitalsigns=require('./routes/vitalsigns');
const symptoms=require('./routes/symptoms');
const nurses=require('./routes/nurses');

//MongoDB config
const db=require('./config/keys').mongoURI;

// Connect To Database using Promise
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database error: ' + err));

const port=process.env.PORT||5000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/patients',patients);

// Index Route
app.get('/',(req,res)=>res.send('Hello COMP308 project'));

// Start Server
app.listen(port,()=>console.log(`Server running on port ${port}`));