const User = require ('../models/user').User
const {isEmpty} = require('../config/customFunctions')

module.exports = {

    index: (req, res) => {
        let pageTitle = "Home"
        let page_name = 'home'
            res.render("index.ejs",{pageTitle,page_name});
    
    },

    user:async(req, res)=>{
        let pageTitle = "Dashboard"
        let user = req.user
        await User.findById(user, function(err,user){
            res.render('dashboard.ejs',{pageTitle, id:user.id})
        })
    },
               
           
    
    authInvest: (req, res) => {
        let pageTitle = "Invest Today"
                res.render("authInvest.ejs",{pageTitle});
        },
                
        
    
}

    



