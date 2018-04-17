const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Patient = require("../../models/patient");

//Register
router.post("/register", (req, res, next) => {
  Patient.findOne({ email: req.body.email })
    .then(patient => {
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

//Authenticate
router.post("/authenticate", (req, res, next) => {
  res.send("AUTHENTICATE");
});

router.get("/test", (req, res, next) => {
  res.json({ msg: "patient works" });
});

module.exports = router;
