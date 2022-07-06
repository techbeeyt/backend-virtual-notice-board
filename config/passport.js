const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.model');

module.exports = (passport) => {
    let opts = {};

    opts.secretOrKey = process.env.SECRET;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        User.find({
            id: jwt_payload.id
        }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }))

}