const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const User=require('../models/User');

const handleSignUp=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            return res.status(400).json({ message: 'All fields are required during SignUp' })
        }
        const match=await User.findOne({email});
        if(match){
            return res.status(400).json({message:'Already exists an user with same email so please login'})
        }
        const hashPwd=await bcrypt.hash(password,10);
        const newUser= new User({name,email,password:hashPwd});
        await newUser.save();
        res.status(201).json({message:'SignUp successful'})
    }catch(err){
        return res.status(500).json({success:false,message:'Error while signUp in authController'})
    }
}

const handleLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const foundUser=await User.findOne({email});
        if(!foundUser){
            return res.status(400).json({message:'No user found with that email id'})
        }
        const pwd=await bcrypt.compare(password,foundUser.password);
        if(!pwd){
            return res.status(400).json({message:'Invalid Password'});
        }
        const accessToken=jwt.sign(
            {email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'}
        )
        const refreshToken=jwt.sign(
            {email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'7d'}
        )
        return res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge:7*24*60*60*1000
        }).status(200).json({message:'Logged in successfully',
        'accessToken':accessToken})

    }catch(err){
        return res.status(500).json({message:'Error in handleLogin in authController'})
    }
}

module.exports={handleSignUp,handleLogin}