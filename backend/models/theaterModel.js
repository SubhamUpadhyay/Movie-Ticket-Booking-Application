const mongoose = require("mongoose");
const { applyTimestamps } = require("./movieModel");
const theaterSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true   
    },
    locations:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true   
        },
        state:{
            type:String,
            required:true   
        },
        pincode:{
            type:String,
            required:true   
        }
    },
    screens:[{
        screenNumber:{
            type:Number,
            required:true
        },
        capacity:{
            type:Number,
            required:true   
        },
        facilities:[String]
    }],
    contactInfo:{
        phone:String,
        email:String
    }
},{timestamps:true});

const Theater = mongoose.model("Theater",theaterSchema);
module.exports = Theater;