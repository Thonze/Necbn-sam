const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller')
const {isUserAuthenticated} = require("../config/customFunctions");

router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'user';

    next(); 
});

router.route('/home')
    .get(usercontroller.index);



router.route('/')
 .get(isUserAuthenticated,usercontroller.user);

router.route('/authinvest')
 .get(isUserAuthenticated,usercontroller.authInvest);


// router.route('/dashboard')
//     .get(usercontroller.Dashboard);

router.route("/logout")
  .delete(usercontroller.index,(req,res) =>{
    req.logOut()
    res.redirect("/login")
})

router.route('/logout', function(req, res){
    var name = req.user.username;
    console.log("LOGGIN OUT " + req.user.username)
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
  });
module.exports = router;