const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require("../config/customFunctions");
const {projectGet, admin,details, ProjectPost} = require("../controllers/adminController");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash')

const cloudinary = require('../middleware/cloudinary')
// const upload = require('../middleware/multer')
 

router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'admin';

    next(); 
});


router.route('/index')
    .get(adminController.index)

router.route('/')
 .get(isUserAuthenticated,adminController.admin);

router.route('/users', isUserAuthenticated)
 .get(isUserAuthenticated,adminController.users);

 //Project
router.route('/post', isUserAuthenticated)
    .get( isUserAuthenticated,adminController.projectGet)
    .post( isUserAuthenticated,adminController.projectPost)


router.route('/delete/:id')
    .delete(isUserAuthenticated,adminController.delete)



router.route('/')
    

  

  


module.exports = router;