const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const defaultcontroller = require('../controllers/defaultcontrollers')
const User = require ('../models/user').User

const {checkAuthenticated,checkNotAuthenticated} = require("../middleware/auth")

// const {inde} = require('../controllers/defaultController')

router.route('/')
    .get(defaultcontroller.Home);

router.route('/about')
    .get(defaultcontroller.About);

router.route('/contact')
    .get(defaultcontroller.Contact);

router.route('/blog')
    .get(defaultcontroller.Blog);

router.route('/investment')
    .get(defaultcontroller.Investment)

router.route('/media')
    .get(defaultcontroller.Media)


router.route('/programs')
    .get(defaultcontroller.Programs)

router.route('/signup')
    .get(defaultcontroller.Signup)
    .post(defaultcontroller.SignupPost)



//Defining local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
      User.findOne({email: email}).then(user => {
        if(!user){
          User.findOne({email:email}).then(user =>{
            if(!user){
              return done(null, false, req.flash('error-message', 'User not found with this email'));
            }
            bcrypt.compare(password, user.password, (err, passwordMatched) =>{
              if(err){
                return err;
              }
              if(!passwordMatched){
                return done(null, false, req.flash('error-message', 'invalid username or password'));
              }
    
              return done(null, user, req.flash('success-message', 'login successful'));
            });
          })
          
        }
        bcrypt.compare(password, user.password, (err, passwordMatched) =>{
          if(err){
            return err;
          }
          if(!passwordMatched){
            return done(null, false, req.flash('error-message', 'invalid username or password'));
          }

          return done(null, user, req.flash('success-message', 'login successful'));
        });
      });
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if(!user){
        usernameField.findById(id, function(err, user){
          done(err, user);
        })
      }else{
        done(err, user);
      }
      
    });
  });
  
  router.route('/login')
  .get(defaultcontroller.Login)
  .post(passport.authenticate('local',{
    successRedirect: '/user',
    failureRedirect:'/login',
    failureFlash: true,
    successFlash: true,
    session: true
   
  }));


//   router.get('/google',
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ]}));

// router.get( '/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/user',
//         failureRedirect: '/login'
// }));

  router.route('/logout')
  .get( (req,res,next) =>{
      req.logout()
        if(req.isAuthenticated()){
          return(req.logout())
          res.redirect('/login')
      }else{
        res.redirect('/login')
      }
      
  })

module.exports = router;