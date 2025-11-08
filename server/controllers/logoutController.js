const handleLogout=async(req,res)=>{
    try{
        const cookies=req.cookies;
        const refreshToken=cookies.refreshToken;
        if(!refreshToken){
            return res.status(204).json({message:'No refreshToken in cookie (refreshTokenController)'})
        }
        res.clearCookie('refreshToken',{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })
        return res.status(204).json({message:'Logged out successfully'})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Error in logoutController'})
    }
}

module.exports={handleLogout}