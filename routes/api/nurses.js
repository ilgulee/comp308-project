const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Nurse = require("../../models/nurse");
const Patient=require("../../models/patient");
const db = require("../../config/keys");

//Register
router.post("/register", (req, res, next) => {
  Nurse.findOne({ email: req.body.email }).then(nurse => {
    if (nurse) {
      return res.json({ email: "Email(username) already exists" });
    } else {
      let newNurse = new Nurse({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });
      Nurse.addNurse(newNurse, (err, nurse) => {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to register new nurse"
          });
        } else {
          res.json({
            success: true,
            msg: "New nurse registered"
          });
        }
      });
    }
  });
});

//Authenticate(login)
router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Nurse.getNurseByEmail(email, (err, nurse) => {
    if (err) {
      throw err;
    }
    if (!nurse) {
      return res.json({
        success: false,
        msg: "Nurse not found"
      });
    }
    Nurse.comparePassword(password, nurse.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (isMatch) {
        const token = jwt.sign(nurse.toJSON(), db.secret, {
          expiresIn: 3600 // 1 hour
        });
        res.json({
          success: true,
          token: "JWT " + token
        });
      } else {
        return res.json({
          success: false,
          msg: "Wrong password"
        });
      }
    });
  });
});

//take the patient




router.get(
  "/test",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) => {
    res.json({
      nurse: req.user
    });
  }
);

module.exports = router;
