
const Post = require('../models/post').Post
const Admin = require('../models/admin').Admin
const User = require('../models/user').User
const {isEmpty} = require('../config/customFunctions')
const ITEMS_PER_PAGE = 1;

module.exports = {
    index: async(req, res) => {
        await Post.find({}, {"_id":1, _id:0}).sort({"_id":-1}).then((post)=>{
            res.render("index.ejs", {post});
        }).catch(err=>{
            console.log(err)
        })
    },

    
    
    admin:async(req, res)=>{
        let pageTitle = 'Home'
        await Admin.findOne().then(async(admin)=>{
            await Post.find().then(post=>{
                // console.log(post)
                res.render('admin.ejs',{pageTitle, post, admin})
        })
    })
},

    projectGet: (req, res) => {
        let pageTitle = "Post";
        Post.find().then(posts => {
            res.render("posts.ejs",{pageTitle});
        })
        
    },

projectPost: async (req,res, ) => {
    
    //check for any input file
    let filename ='';
    if(!isEmpty(req.files)){
        let file = req.files.uploadedfile
        filename = file.name
        let uploadDir = './public/uploads/'

        file.mv(uploadDir+filename, (err) =>{
            if (err)
                throw err
        })
    }

        const newPost =  new Post({
            Title: req.body.Title,
            Category: req.body.Category,
            Link: req.body.Link,
            file:`/uploads/${filename}`
             
    });

   await newPost.save().then(post =>{
       console.log(post);
      
       req.flash('success-message', 'project added successfully')
       return res.redirect('/admin')
   });

    
},
// delete:async(req, res)=>{
//     let id = req.params.id
//     console.log(id)
//     await Post.findOneAndDelete(id).then(post=>{
//         console.log('project deleted successfully')
//         req.flash('error-message', 'post deleted successfully')
//         return res.redirect('/admin')
//     }).catch(err=>{
//         console.log('something went wrong')
//         req.flash('error-message', 'something went wrong please try again')
//     })
// },


// users: (req, res) => {
//     let pageTitle = "Home"
//     let page_name = 'home'
//         res.render("user.ejs",{pageTitle,page_name});

// },
users: async(req, res) => {
    const page = +req.query.page || 1;
    let totalItems;
    let pageTitle = 'Users'
    await User.find({}, {"_id":1, _id:0}).sort({"_id":-1}).then((user)=>{
        res.render("user.ejs", {user, pageTitle,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
        
    }).catch(err=>{
        console.log(err)
    })
    // .countDocuments()
    // .then(numUsers =>{
    //     totalItems = numUsers
    //     return User.find().skip((page - 1) *Items_per_page )
    //     .limit(Items_per_page)
    // })
    
    
},

 
delete:async(req, res)=>{
    let id = req.params.id
    console.log(id)
    await User.findOneAndDelete(id).then(user=>{
        res.render('user.ejs',{user})
        console.log('project deleted successfully')
        req.flash('error-message', 'user deleted successfully')
        return res.redirect('/admin/users')
    }).catch(err=>{
        console.log('something went wrong')
        req.flash('error-message', 'something went wrong please try again')
    })
},
    
}


