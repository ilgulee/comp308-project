const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/profile");

// Load patient Model
const Patient = require("../../models/patient");

router.get("/test", (req, res, next) => {
  res.json({ msg: "profile works" });
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ patient: req.user.id })
      //.populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this patient";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.patient = req.user.id;
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.phone) profileFields.phone = req.body.phone;

    if (typeof req.body.history !== "undefined") {
      profileFields.history = req.body.history.split(",");
    }

    if (req.body.birthday) profileFields.birthday = req.body.birthday;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.blood) profileFields.blood = req.body.blood;

    Profile.findOne({ patient: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { patient: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

module.exports = router;
