const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrpyt = require("bcrypt");
const user = require("../models/user");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const option = (err, user, password, done) => {
  if (err) {
    return done(err);
  }
  if (!user) {
    return done(null, false);
  }

  if (!bcrpyt.compareSync(password, user.password)) {
    return done(null, false);
  }
  return done(null, user);
};

passport.use(
  new LocalStrategy((username, password, done) => {
    user.findOne({ username: username }, (err, user) =>
      option(err, user, password, done)
    );
  })
);

module.exports = passport;
