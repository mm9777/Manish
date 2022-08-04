const  jwt = require('jsonwebtoken');
const secret =  "Youth_is_ready"
exports.generate_token = (data, expiresIn = "1d") => {
    return jwt.sign({ data }, "Youth_is_ready", { expiresIn });
  };

exports.token_parser = async(req, res, next) => {
  // console.log("aaaaaaaaa",req)

  const {token} = req.query;
  // console.log("aaaaaa",token)
  try {
    const decoded = await Promise.resolve(jwt.verify(token, secret));
    // console.log("bbbbbbbb",decoded)
    
     req.body.token = decoded;
     next();
  } catch (error) {
    next(error);
  }
  
}