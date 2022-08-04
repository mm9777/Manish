const { generate_token } = require("../utilities/jwt_token");
const { sendMailTo } = require("../utilities/nodeMailer");
const {signupModel}= require("../models/signup.model");
const {hash_password, match_password} = require("../bcrypt/bcrypt");
const { TokenExpiredError } = require("jsonwebtoken");
const bcrypt = require('bcrypt')
// saltRounds = 10;

exports.signupController = async(req, res, next) => {
  console.log("==================?????????")
  const email = req.body.email;
  const check_email = await signupModel.findOne({email:email})
  // const email_ver= email;
  if(check_email){
    res.send("user allready exist")
  }

  else{
  
  
  
  const hashpassword = await hash_password(req.body.password)
    console.log("hash",hashpassword)
    
    req.body.password = hashpassword
    let detail = signupModel(req.body);
    
    let data = req.body

  
 
   signupModel(req.body).save(async (err, result) => {
    console.log("fghh", result._id)
    if (err) {
      next(new Error("Data not saved"));
    }
  
    //  ----------------------------
    const verifyAccount =  generate_token(result._id, `${60 * 15}s`);
    // console.log(verifyAccount)
    const emailLink = `http://localhost:1616/verify-account?token=${verifyAccount}`;
    //  Send email
    const emailStatus = await sendMailTo(
      ["mm7853355@gmail.com", "jitendra7518888@gmail.com"],
      emailLink
    );
    // ---------------------------------
    res.status(200).send({ result, emailStatus });
  });
  }      
}




exports.verifyAccountController =(req, res, next) => {
// console.log("SSSSS",req.body.token)
  const { data =  "" } = req.body.token;
  // -----------------------------------------
   signupModel.findOne({ _id: data }, async (err, result) => {
    // console.log("QQQQQQ",result)
    if (err) {
      next(err);
    } else if (result) {
      const updateAccount = await signupModel.findByIdAndUpdate(
        { _id: data },
        { is_Verified: 1 }
      );
      // console.log("HHHHHH",updateAccount)
      res.send({ status: "Account Verified", updateAccount });
    } else {
      res.send({ status: "Invalid Url" });
    }
  });
};




exports.signinController = async(req, res, next) => {
  const plain_password =  req.body.password
  const email = req.body.email
  const hash_password = await signupModel.findOne({email})
  // console.log(hash_password)
  const hash_pass = hash_password.password
  console.log(hash_pass)
  const result = await match_password(plain_password,hash_pass)
  if(result){
    

  // updated_on set in signup schema
  const token = generate_token(req.body?.userInfo);
  res.send({ userInfo: req.body.userInfo, token });
}
else{
  res.send("invalid password")
}
}


