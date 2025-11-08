const express=require('express')
const router=express.Router();

const {handleSignUp,handleLogin}=require('../controllers/authController')
const {handleRefreshToken}=require('../controllers/refreshTokenController')
const {handleLogout}=require('../controllers/logoutController')

router.post('/signup',handleSignUp);
router.post('/login',handleLogin)
router.get('/refresh',handleRefreshToken)
router.post('/logout',handleLogout)

module.exports=router;