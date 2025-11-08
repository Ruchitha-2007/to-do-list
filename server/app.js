const connectDB=require('./config/db');
const express= require('express')
const app=express();
const cors=require('cors');
const postRoute=require('./routes/postRoute');
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/authRoute')

connectDB();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoute)
app.use('/posts',postRoute)
app.use('/',(req,res)=>{
    res.json({mesage:'Home page'})
})
module.exports=app;