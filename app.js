const express = require('express')
const app=express();
const connectDb=require('./config/db')
const userModel=require('./models/userModel');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes=require("./routes/authRoutes");
const path = require("path");

//function for datbase connection
connectDb();

//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());

//routes

app.use('/auth',authRoutes)


app.listen(3000);