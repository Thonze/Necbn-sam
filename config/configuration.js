module.exports = {
    mongoDbUrl: 'mongodb://localhost:27017/Necbn',
     PORT: process.env.PORT || 4007,
    globalVariables: (req, res, next) =>{
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;
        res.locals.isAuthenticated = req.user ? true : false;
        res.locals.session = req.session;
        
        next();

    }
};