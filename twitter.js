require('dotenv').config();
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/news"
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }
));