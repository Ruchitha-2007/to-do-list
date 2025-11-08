const mongoose=require('mongoose');

const postSchema= new mongoose.Schema({
    title:{
        type: String,
        required:[true,'Post title is required'],
    },
    content:{
        type:String,
        required:[true,'Post content is required'],
    },
    userEmail: { type: String, required: true } 
},{
    timestamps:true,
});

const Post=mongoose.model("Post",postSchema);

module.exports= Post;