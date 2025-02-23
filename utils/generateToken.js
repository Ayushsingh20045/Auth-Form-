const jwt = require('jsonwebtoken');

const generateToken = (data)=>{
 return jwt.sign(data,process.env.SECRET_KEY)
}

module.exports=generateToken;