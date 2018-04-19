const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Patient = require("../../models/patient");
const db = require("../../config/keys");

//Register
router.post("/register", (req, res, next) => {
  Patient.findOne({ email: req.body.email }).then(patient => {
    if (patient) {
      return res.status(400).json({ email: "Email(username) already exists" });
    } else {
      let newPatient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        registeredDate: req.body.registeredDate,
        nurseRef: req.body.nurseRef
      });
      Patient.addPatient(newPatient, (err, patient) => {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to register new patient"
          });
        } else {
          res.json({
            success: true,
            msg: "New patient registered"
          });
        }
      });
    }
  });
});

//Authenticate(login)
router.post("/authenticate", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Patient.getPatientByEmail(email, (err, patient) => {
    if (err) {
      throw err;
    }
    if (!patient) {
      return res.status(404).json({
        success: false,
        msg: "Patient not found"
      });
    }
    Patient.comparePassword(password, patient.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (isMatch) {
        const token = jwt.sign(patient.toJSON(), db.secret, {
          expiresIn: 3600 // 1 hour
        });
        res.json({
          success: true,
          token: "JWT " + token,
          patient: {
            id: patient._id,
            email: patient.email,
            firstName: patient.firstName,
            lastName: patient.lastName,
            nurseRef: patient.nurseRef,
            registeredDate: patient.registeredDate
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          msg: "Wrong password"
        });
      }
    });
  });
});

router.get(
  "/test",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) => {
    res.json({
      patient: req.user
    });
  });

module.exports = router;
