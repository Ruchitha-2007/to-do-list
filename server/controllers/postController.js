const Post=require('../models/Post')

const getAllPosts=async(req,res)=>{
    try{
        const userEmail=req.user.email;
        const posts=await Post.find({userEmail});
        if(!posts){
            return res.status(200).json({message:'No posts'})
        }
        return res.status(200).json({posts});
    }catch(err){
        res.status(500).json({message:`Error while reading all posts : ${err}`})
    }
} 

const createPost=async(req,res)=>{
    try{
        const {title,content}=req.body;
        const userEmail=req.user.email;
        if(!title||!content){
            return res.status(400).json({message:'Both title and content are required to create Post'})
        }
        const newPost= await Post.create({
            title,content,userEmail
        })
        res.status(201).json({message:'New Post created \n',newPost});
    }catch(err){
        res.status(500).json({message:'New Post not created :',Error:err});
    }
}

const updatePost=async(req,res)=>{
    try{
        const {id}=req.params;
        const updatePost=await Post.findOne({_id:id,userEmail: req.user.email});
        if(!updatePost){
            return res.status(404).json({message:'No post found to Update post'})
        }
        const {title,content}=req.body;
        updatePost.title=title||updatePost.title;
        updatePost.content=content||updatePost.content;
        await updatePost.save();
        res.status(200).json({message:'Post updated successfully \n',post:updatePost})
    }catch(err){
        res.status(500).json({message:'Error while updating post : ',err});
    }
}
const deletePost=async(req,res)=>{
    try{
        const userEmail = req.user.email;
        const {id}=req.params;
       const deletePost=await Post.findOne({_id:id,userEmail}); 
        if(!deletePost){
            return res.status(404).json({message:'DeletePost not found'});
        }
        await deletePost.deleteOne();
        res.status(200).json({message:'Post deleted successfully'});
    }catch(err){
        res.status(500).json({message:'Error while deleting post : ',err});
    }
}

module.exports={
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}