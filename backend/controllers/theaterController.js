const Theater = require("../models/theaterModel");
const createTheater = async(req,res)=>{
    try{
        const theater =await Theater.create(req.body);
        return res.status(201).json({message:"Theater Created Successfully"});
    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
}


const getTheatersByCity = async(req,res)=>{
    try{
        const {city} = req.params;
        const theaters = await Theater.find({city});
        return res.status(200).json({theaters});
    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
}

const getAllTheaters = async(req,res)=>{
    try{
        const theaters = await Theater.find();
        return res.status(200).json({theaters});
    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
}


module.exports = {createTheater, getAllTheaters, getTheatersByCity};