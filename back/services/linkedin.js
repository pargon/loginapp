const passport = require('passport');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
require('dotenv').config()

const strategy_name = 'linkedin';

passport.use(strategy_name, new LinkedinStrategy({
    clientID: process.env.LINKEDING_CLIENT_ID,
    clientSecret: process.env.LINKEDING_CLIENT_SECRET,
    callbackURL: process.env.LINKEDING_CALLBACK,
    scope: ['r_emailaddress', 'r_liteprofile']
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
