const { check } = require('express-validator');
const { signup } = require('../controllers/signinsignup.controller');
const {signupModel} = require('../models/signup.model')
 const bcrypt = require('bcrypt')


exports.signup_validator = () => {
  return [
    check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
    check('email').isEmail().withMessage('Invalid Email'),
     
     
    check('name').isLength({min: 3}).withMessage("'Name' Lenght must be more then 3")
  ]
}

exports.signin_validator = () => {
  return [
    check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
    check('email').isEmail().custom( async (email,{req})=>{
     const plain_password = req.body.password
     const user_info = await signupModel.findOne({email},
                     {__v:false});
      // const hash_password = user_info.password
      // const result = await bcrypt.compare(plain_password,hash_password)

      if(!user_info){ throw new Error("Invalid User"); 
      req.body.userInfo = user_info;
    }
      

      
       req.body.userInfo = user_info;

      return true
    }),
   ]
}