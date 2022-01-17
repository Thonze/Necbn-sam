const express = require('express')
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash')
const feed = require('feed')

// const boxicons = require('boxicons')
const methodOverride = require('method-override');
const mongoStore = require("connect-mongo")
const {mongoDbUrl,PORT} = require('./config/configuration');
const {globalVariables} = require('./config/configuration');
require("dotenv").config()
require('./passport-setup')


const app = express()

// configure mongoose to connect to mongoDB
mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response =>{
        console.log('mongoDB connected successfully.');
    }).catch(err =>{
        console.log('Database connection failed.');
    })
    
//mongoose section
    // app.use(session({
    //     secret: 'zacks1',
    //     saveUninitialized: true,
    //     resave: true,
    //     store: new mongoStore({ mongooseConnection: mongoose.connection }),
    //     cookie: {
    //         maxAge: 180 * 60 * 1000
    //       }
    
    
    // }));
    



// configure express
app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('newMethod'))


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.json('application/vnd.api+json'));

app.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ]}));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/user',
        failureRedirect: '/login'
}));

// global variable
app.use(flash());
app.use(globalVariables);

app.get('/api/articles',function (req,res){
    var mediumProfile="https://medium.com/feed/@"+ process.env.MEDIUM_USERNAME

    feed(mediumProfile, function(err, articles){
        if(err)
        res.send(err)

        res.json(articles)
    })
})

// app.locals.boxicons = require('boxicons')
app.use("/icons", express.static(path.join(__dirname, "../node_modules/boxicons")));


// Route grouping
const defaultRoutes = require('./routes/defaultRoutes');
const userroutes = require('./routes/userroutes');
// const adminRoutes = require('./routes/adminRoutes');
app.use("/", defaultRoutes);
// app.use("/admin", adminRoutes);
app.use("/user", userroutes);


app.listen(PORT,(req,res) =>{
    console.log(`server started at port ${PORT}`);
});