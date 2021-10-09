const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    const id = jwt_payload.id
    User.findOne({ where: { id } })
      .then(user => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false);
        }
      })
      .catch(err => done(err));
  }))
};