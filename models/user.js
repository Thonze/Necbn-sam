const mongoose = require ('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    phoneNumber: {
        type: String,
        required: true 
    },
    country: {
        type: String,
        required: true 
    },
    city: {
        type: String,
        required: true 
    },
    address: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    

    
});

module.exports = {User: mongoose.model('user', UserSchema)};


  