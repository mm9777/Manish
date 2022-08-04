const bcrypt = require('bcrypt')
exports.hash_password = async(password)=>{
    return await bcrypt.hash(password,10)

}
exports.match_password = async(password,hash_password)=>{
    return bcrypt.compare(password,hash_password);
}

 

