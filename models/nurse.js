const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Nurse Schema
const NurseSchema = new Schema(
  {
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: "patient"
      }
    ],
    firstName: {
      type: String,
      trim: true,
      required: "First name is required"
    },
    lastName: {
      type: String,
      trim: true,
      required: "Last name is required"
    },
    email: {
      //username
      type: String,
      trim: true,
      required: "Email address is required",
      unique: true
    },
    password: {
      type: String,
      required: "Password is required"
    },
    role: {
      type: String,
      default: "nurse"
    }
  },
  {
    timestamps: true
  }
);

const Nurse = (module.exports = mongoose.model("Nurse", NurseSchema));

module.exports.addNurse = function(newNurse, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newNurse.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newNurse.password = hash;
      newNurse.save(callback);
    });
  });
};

//email is username
module.exports.getNurseByEmail = function(email, callback) {
  const query = { email };
  Nurse.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) {
      throw err;
    }
    callback(null, isMatch);
  });
};

