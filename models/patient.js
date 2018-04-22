const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Patient Schema
const PatientSchema = new Schema(
  {
    nurse: {
      type: Schema.Types.ObjectId,
      ref: "nurse"
    },
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      //username
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "patient"
    }
  },
  {
    timestamps: true
  }
);

const Patient = (module.exports = mongoose.model("Patient", PatientSchema));

