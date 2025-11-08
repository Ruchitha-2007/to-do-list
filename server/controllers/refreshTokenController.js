const jwt=require('jsonwebtoken')

const handleRefreshToken=async(req,res)=>{
    try{
        const cookies=req.cookies;
        if(!cookies){
            return res.status(401).json({message:'No cookie i refreshToken Controller'})
        }
        const refreshToken=cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message:'No refreshToken in cookie (refreshTokenController)'})
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err,decoded)=>{
                if(err){
                    return res.status(403).json({message:'Error in verifying refreshToken in refreshTokenController'})
                }
                const email=decoded.email
                const newAccessToken=jwt.sign(
                    {email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'15m'}
                )
                return res.status(200).json({message:'New access token generated',accessToken:newAccessToken})
            }
        )
        
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Error in try handleRefreshToken in refreshTokenController'})
    }
}   

module.exports={handleRefreshToken}