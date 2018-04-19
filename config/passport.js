const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Patient=require('../models/patient');
const db=require('./keys');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = db.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Patient.getPatientByEmail(jwt_payload.email, (err, patient) => {
            if (err) {
                return done(err, false);
            }
            if (patient) {
                return done(null, patient);
            } else {
                return done(null, false);
            }
        });
    }));
}