const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    theater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Theater',
        required:true
    },
    screenNumber:{
        type:Number,
        required:true
    },
    showTime:{
        type:String,
        required:true
    },
    pricing:{
        regular:{
            type:Number,
            required:true
        },
        premium:{
            type:Number,
            required:true
        },
        vip:{
            type:Number
        }
    },
    availableSeats:{
        regular:{
            type:Number,
            required:true   
        },
        premium:{
            type:Number,
            required:true
        },
        vip:{
            type:Number,
            default:0   
        }
    },
    status:{
        type:String,
        enum:['ACTIVE',"CANCELLED","COMPLETED"],
        default:'ACTIVE'
    }
},{timestamps:true});

const Show = mongoose.model("Show",showSchema);
module.exports = Show;