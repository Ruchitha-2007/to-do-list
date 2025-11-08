const express= require('express')
const router=express.Router();
const verifyJWT=require('../middleware/verifyJWT')
const { getAllPosts,
    createPost,
    updatePost,
    deletePost}=require('../controllers/postController');

router.get('/',verifyJWT,getAllPosts)
    .post('/',verifyJWT,createPost)
    .put('/:id',verifyJWT,updatePost)
    .delete('/:id',verifyJWT,deletePost)

module.exports=router;