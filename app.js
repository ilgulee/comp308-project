const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app=express();

//setup routes
const patients = require('./routes/api/patients');
const profile=require('./routes/api/profile');
const nurses=require('./routes/api/nurses');


//MongoDB config
const db=require('./config/keys').mongoURI;

// Connect To Database using Promise
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database error: ' + err));

const port=process.env.PORT||8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/api/patients',patients);
app.use('/api/profile',profile);
app.use('/api/nurses',nurses);

// Index Route
app.get('/',(req,res)=>res.send('Hello COMP308 project'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Start Server
app.listen(port,()=>console.log(`Server running on port ${port}`));