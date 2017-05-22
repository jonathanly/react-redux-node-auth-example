const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), // fromAuthHeader() => requires JWT prefix in header
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
});

passport.use(jwtLogin);
passport.use(localLogin);
