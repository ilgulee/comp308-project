const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Patient = require("../models/patient");
const Nurse = require("../models/nurse");
const db = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = db.secret;

module.exports = function(passport) {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {

      if (jwt_payload.role === "patient") {
        Patient.findOne({email:jwt_payload.email})
        .then(patient => {
            if (patient) {
              return done(null, patient);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
        } 
      }))}
    //   if (jwt_payload.role === "nurse") {
    //     Nurse.getNurseByEmail(jwt_payload.email, (err, nurse) => {
    //       if (err) {
    //         return done(err, false);
    //       }
    //       if (nurse) {
    //         return done(null, nurse);
    //       } else {
    //         return done(null, false);
    //       }
    //     }