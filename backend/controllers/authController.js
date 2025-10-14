const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async(req,res)=>{
    try{
        const {name,email,password,phone} = req.body;
        if(!name || !email || !password || !phone) 
        {
            return res.status(400).json({error:"All feilds required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(409).json({error:"User Already Exist"});
            
        }
        //auto gen a salt and hash 
        const hashedPassword = bcrypt.hash(password,12);
        const user = await User.create({
            name,email,password:hashedPassword,phone
        });

        //token for login
        const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});

        return res.status(201).json({message:"User Registed Successfully, user:{id:user._id,name:user.name,email:user.email,role:user.role}"});
        
    }catch(err)
    {
        return res.status(500).json({error:"Registration Failed"});
    }
}






