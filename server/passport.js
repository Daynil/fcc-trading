'use strict';

let LocalStrategy = require('passport-local').Strategy;
let User = require('./user');

module.exports = passport => {
  passport.serializeUser( (user, done) => {
    done(null, user);
  });

  passport.deserializeUser( (user, done) => {
    User.findOne({ 'username': user.username }, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ 'username': username }, (err, user) => {
        if (err) {
          console.log('signup error: ', err);
          return done(err);
        }

        if (user) {
          console.log('Username taken');
          return done(null, false);
        }
        else {
          let newUser = new User({
            username: username,
            password: newUser.generateHash(password)
          });
          newUser.save( err => {
            if (err) {
              console.log('new user save error', err);
              throw err;
            }
            console.log('new user created successfully');
            return done(null, newUser);
          });
        }
      });
  }));

  passport.use('local-login', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ 'username': username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);

        if (!user.validatePassword(password)) return done(null, false);
        return done(null, user);
      });
    }));
}