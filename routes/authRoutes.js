const express=require('express')
const router=express.Router();
const{registerUser,loginUser,logoutUser,postLogin,postRegister,userProfile}=require('../controllers/authControllers')
const{isLoggedIn}= require("../middlewares/isLoggedIn")

router.get("/register",registerUser)
router.post('/register',postRegister)
router.get("/login",loginUser)
router.post('/login',postLogin)
router.post("/logout",logoutUser)
router.get("/profile",isLoggedIn,userProfile)

module.exports=router;