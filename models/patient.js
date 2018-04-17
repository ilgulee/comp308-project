const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db=require('../config/keys').mongoURI;

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

// Patient Schema
const PatientSchema = mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    email: { //username
        type: String,
        trim: true,
        required: 'Email address is required',
        unique:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    nurseRef: {
        type: String,
        trim: true,
    },
    registeredDate:{
        type:Date,
        default:Date.now
    }
});

const Patient=module.exports=mongoose.model('Patient',PatientSchema);

module.exports.addPatient=function(newPatient,callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPatient.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newPatient.password = hash;
            newPatient.save(callback);
        });
    });
}

module.exports.getPatientById=function(id,callback){
    Patient.findById(id,callback);
}

//email is username
module.exports.getPatientByEmail=function(email,callback){
    const query={email:email};
    Patient.findOne(query,callback);
}