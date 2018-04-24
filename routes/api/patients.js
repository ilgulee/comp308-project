const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Patient = require("../../models/patient");
const db = require("../../config/keys");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
//router.get("/test", (req, res) => res.json({ msg: "Patients route Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.json(errors);
  }

  Patient.findOne({ email: req.body.email }).then(patient => {
    if (patient) {
      errors.email = "Email already exists";
      return res.json(errors);
    } else {
      const newPatient = new Patient({
        nurse: req.body.nurse,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPatient.password, salt, (err, hash) => {
          if (err) throw err;
          newPatient.password = hash;
          newPatient
            .save()
            .then(patient => res.json({patient,success:true}))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login Patient / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  Patient.findOne({ email }).then(patient => {
    // Check for patient
    if (!patient) {
      errors.email = "Patient not found";
      return res.json(errors);
    }

    // Check Password
    bcrypt.compare(password, patient.password).then(isMatch => {
      if (isMatch) {
        // is Matched
        const payload = {
          id: patient.id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          nurse: patient.nurse,
          role: patient.role
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(payload, db.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "JWT " + token
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) => {
    res.json({
      patient: req.user
    });
  }
);

module.exports = router;
