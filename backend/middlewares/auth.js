const jwt  = require('jsonwebtoken')
require('dotenv').config();
const authenticate = (req,res,next) =>{
    try{
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(401).json({error:"Authentication required"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({error:"Token Expired"+err.message});
    }
}



const isAdmin = (req,res,next)=>{
    if(req.user.role !== "ADMIN" )  
    {
        return res.status(403).json({error:"Admin Access Required"});
    }
    next();
}

module.exports = {authenticate,isAdmin};