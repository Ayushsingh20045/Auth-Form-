const userModel = require("../models/userModel");
const router = require("../routes/authRoutes");
const bcrypt=require('bcrypt');
const generateToken = require("../utils/generateToken");


module.exports.registerUser=(req,res)=>{
res.render('register')
}

//post register route

module.exports.postRegister=async(req,res)=>{
   const{email,password,username}=req.body;
  try{
     let user =await userModel.findOne({email});
if(user){
    
 return  res.status(400).send("user already exist please login")

   }
//encrypt password first:
let salt=await bcrypt.genSalt();
let hashpassword = await bcrypt.hash(password,salt);
user = await userModel.create({
    username,
    email,
    password:hashpassword
})

//call token to store data
let token =generateToken({email})
// console.log(token)
//create cookie:
res.cookie("token",token,{httpOnly:true,secure:true,maxAge:1*24*60*60*1000}); //1 day validation

  }
  catch(err){
    res.status(500).send(err.message)
  };
};

module.exports.loginUser=(req,res)=>{
    res.render('login')

}
//post route for login:

module.exports.postLogin=async(req,res)=>{
const{email,password}=req.body;
try{
    let user=await userModel.findOne({email});
if(!user){
  return  res.status(500).send("don't have account please register")
}

let result = await bcrypt.compare(password,user.password);
if(result){
    let token=generateToken({email});
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        maxAge:1*24*60*60*1000           //1 day validation

    }) ;
    res.status(200).send("logged in sucessfully")
   

}
else{
    res.status(500).send("email or password incorrect");
}
}
catch(err){
 return res.status(500).send(err.message);
}
}

module.exports.logoutUser=(req,res)=>{
  let cookie= res.cookie("token","",{httpOnly:true,
    secure:true
   })
   
   return res.status(200).send("logged out successfully");

}
module.exports.userProfile=(req,res)=> {
res.render('profile')
   
 }