const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateVitalInput = require("../../validation/vital");
//const validateSymptomInput = require('../../validation/symptom');

// Load Profile Model
const Profile = require("../../models/profile");
// Load patient Model
const Patient = require("../../models/patient");

router.get("/test", (req, res, next) => {
  res.json({ msg: "profile works" });
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ patient: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this patient";
          return res.json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.json(err));
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.json(errors);
    }

    const profileFields = {};
    profileFields.patient = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
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
        ).then(profile => res.json({profile,success:true}));
      } else {
        // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.json({errors,success:false});
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json({profile,success:true}));
        });
      }
    });
  }
);

// @route   POST api/profile/alert
// @desc    Create emergency alert
// @access  Private
router.post(
  "/alert",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ patient: req.user.id }).then(profile => {
      const newAlert = {
        reason: req.body.reason,
        isChecked: req.body.isChecked,
        isCancelled: req.body.isCancelled,
        description: req.body.description,
        comment: req.body.comment,
        time: req.body.time
      };
      // Add to alert array on top
      profile.alerts.unshift(newAlert);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/vital
// @desc    Create vital
// @access  Private
router.post(
  "/vital",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVitalInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ patient: req.user.id }).then(profile => {
      const newVital = {
        temperature: req.body.temperature,
        heartRate: req.body.heartRate,
        bloodPressure: req.body.bloodPressure,
        respiratoryRate: req.body.respiratoryRate,
        description: req.body.description,
        comment: req.body.comment,
        time: req.body.time
      };
      // Add to vital array on top
      profile.vitals.unshift(newVital);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/symptom
// @desc    Create symptom
// @access  Private
router.post(
  "/symptom",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ patient: req.user.id }).then(profile => {
      const newSymptom = {
        fever: req.body.fever,
        cough: req.body.cough,
        fatigue: req.body.fatigue,
        age: req.body.age,
        description: req.body.description,
        comment: req.body.comment,
        time: req.body.time
      };
      // Add to vital array on top
      profile.symptoms.unshift(newSymptom);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/alert/:alert_id
// @desc    Delete alert from profile
// @access  Private
router.delete(
  '/alert/:alert_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ patient: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.alerts
          .map(item => item.id)
          .indexOf(req.params.alert_id);

        // Splice out of array
        profile.alerts.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);

// @route   DELETE api/profile/vital/:vital_id
// @desc    Delete vital from profile
// @access  Private
router.delete(
  '/vital/:vital_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ patient: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.vitals
          .map(item => item.id)
          .indexOf(req.params.vital_id);

        // Splice out of array
        profile.vitals.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);

// @route   DELETE api/profile/symptom/:symptom_id
// @desc    Delete symptom from profile
// @access  Private
router.delete(
  '/symptom/:symptom_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ patient: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.symptoms
          .map(item => item.id)
          .indexOf(req.params.symptom_id);

        // Splice out of array
        profile.symptoms.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
