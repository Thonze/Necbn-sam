const User = require ('../models/user').User
const Post = require ('../models/post').Post
const bcrypt = require('bcryptjs')
module.exports = {

    Home: (req,res) => {
        let pageTitle = 'Home'
        let page_name = 'home'
          res.render('index.ejs' ,{pageTitle,page_name})
      },

    About: (req,res) => {
        let pageTitle = 'About'
        let page_name = 'about'
          res.render('about.ejs',{pageTitle,page_name})
      },
    Blog: (req,res) => {
        let pageTitle = 'Blog Page'
        let page_name = 'blog'
          res.render('blog.ejs',{pageTitle,page_name})
      },

    //   Blog:async(req, res)=>{
    //     let pageTitle = 'Blog Page'
    //     let page_name = "Blog"
    //     await Post.find({}, {"_id":1, _id:0}).sort({"_id":-1}).then(post=>{
    //           res.render('blog.ejs',{pageTitle, post, page_name})
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // },
    
    Contact: (req,res) => {
        let pageTitle = 'Contact'
        let page_name = 'contact'
          res.render('contact.ejs',{pageTitle,page_name})
      },

    Investment: (req,res) => {
        let pageTitle = 'Investment'
        let page_name = 'investment'
          res.render('investment.ejs',{pageTitle,page_name})
      },
    
    Media: (req,res) => {
        let pageTitle = 'Events'
        let page_name = 'media'
          res.render('media.ejs',{pageTitle,page_name})
      },

    Programs: (req,res) => {
        let pageTitle = 'Programs'
        let page_name = 'programs'
          res.render('programs.ejs',{pageTitle,page_name})
      },
      Signup: (req,res) => {
        let pageTitle = 'Create an Account '
        let page_name = 'signup'
        
        // req.flash('success-message', 'Enter email and password')
        res.render('signup.ejs',{pageTitle,page_name}) 
      },
      SignupPost: async (req,res, next) => {
        
        let errors = []
        if(!req.body.firstName){
          req.flash("error-message", "first name required")
        }
        if(!req.body.lastName){
          req.flash("error-message", "last name required")
        }
        if(!req.body.email){
          req.flash("error-message", "email name required")
        }
        if(!req.body.phoneNumber){
          req.flash("error-message", "email required")
        }
        if(!req.body.address){
          req.flash("error-message", "address required")
        }
        if(!req.body.city){
          req.flash("error-message", "Enter your city")
        }
        if(!req.body.password !== req.body.Confirmpassword){
          req.flash("error-message", "password does not match,try again")
        }
        const userFound = await User.findOne({email: req.body.email})

    if(userFound) {
      
        req.flash("error-message", "User with that email already exist")
        res.redirect("/signup")
    } else {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              phoneNumber: req.body.phoneNumber,
              country: req.body.country,
              city: req.body.city,
              address: req.body.address,
              password: hashedPassword
            })
            await user.save();
            req.flash('success-message', 'Account created')
            res.redirect("/login");
        } catch(error){
            console.log(error)
            res.redirect("/signup")
        }
    }
        
    },

      Login: (req,res) => {
        let pageTitle = 'login'
        let page_name = 'login'
        req.flash('failure-message', 'invalid details')
        req.flash('success-message', 'Enter email and password')
          res.render('login.ejs',{pageTitle,page_name})
      },

      Dashboard: (req,res) => {
        let pageTitle = 'Dashboard'
        let page_name = 'dashboard'
          res.render('dashboard.ejs' ,{pageTitle,page_name})
      },

    
          
      Login: (req,res) => {
        let pageTitle = 'login'
        let page_name = 'login'
        req.flash('failure-message', 'invalid details')
        req.flash('success-message', 'Enter email and password')
          res.render('login.ejs',{pageTitle,page_name})
      },

      
    
}