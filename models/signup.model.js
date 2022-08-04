const Mongoose = require('mongoose');

const signup_schema = new Mongoose.Schema({
 
    name : String,
    email : {
        type: String,
        required : true,
    },
    password : {
        type: String,
        required : true,
    },
    is_Verified : 0,
    created_on : {
        type: Date,
        default : new Date()
    },
    updated_on:{
        type: Date,
        default : new Date()
    }


}) 

const signupModel = Mongoose.model("signup",signup_schema);

module.exports = {signupModel}