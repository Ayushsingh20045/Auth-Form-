const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel');

module.exports.isLoggedIn=async(req,res,next)=>{

    if(req.cookies.token){
  try{      
   let data =  jwt.decode(req.cookies.token,process.env.SECRET_KEY);
   let user = await userModel.findOne({email:data.email}).select("-password");
   req.user=user; //saving user in request
   next();
}
catch(err){
    res.status(500).send("login first")
}

}
if(!req.cookies.token){
    res.status(500).send("Unauthorized access")
}

};


