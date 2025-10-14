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
        return res.status(500).json({error:"Registration Failed"+err.message});
    }
}




const login = async(req,res)=>{
    try{
        const{email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({error:"Email & Password both required"});
        }
        const user = await User.findOne({email});
        if(!user)   
        {
            return res.status(401).json({error:"User not found . please register"});
        }
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword)
        {
            return res.status(401).json({error:"Invalid Credentials"});
        }

        const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});
        return res.status(200).json({message:"Login Successful"});
    }  
    catch(err)
    {
        res.status(500).json({error:"Login Failed"+err.message});
    } 
}



module.exports = {register,login};
