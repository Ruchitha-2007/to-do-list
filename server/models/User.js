const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:6
    },
},{timestamps:true})

const User=mongoose.model("User",userSchema)

module.exports=User;