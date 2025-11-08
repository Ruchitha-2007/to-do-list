const mongoose= require('mongoose');

const connectDB=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected to server`);        
    }catch(err){
        console.log('Connection to mongoDB is not established');
        console.log(err);
    }
} 

module.exports=connectDB;