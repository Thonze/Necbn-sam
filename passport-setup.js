const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require ('./models/user').User

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(!user){
      User.findById(id, function(err, user){
        done(err, user);
      })
    }else{
      done(err, user);
    }
    
  });
});


passport.use(new GoogleStrategy({
    clientID:    "445302123753-9kvnjv4pag7c4aptevmtlf3hco7dki9g.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4008/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    //use profile to check if user is register in db
    User.findOne({ googleId: profile.id }, function (err, user) {
      return done(err, user);
      
    });
  }
));