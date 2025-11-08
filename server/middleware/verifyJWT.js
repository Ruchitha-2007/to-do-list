const jwt=require('jsonwebtoken')

const verifyJWT=async(req,res,next)=>{
    const authHeader=req.headers['authorization']

    if(!authHeader){
        return res.status(401).json({message:'No token'})
    }
    const token=authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Invalid token'})
    }
    try{
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user=decoded;
        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return res.status(403).json({ message: 'Token is not valid in verifyJWT' });
    }
}
module.exports=verifyJWT;   