const mongoose =  require("mongoose")
// const {schema} = mongoose;



const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    casts:{
        type:[String],
        required:true
    },
    trailerUrl:{
        type:String,
        required:true
    },
    langugae:{
        type:[String],
        required:true,
        default:"English"
    },
    releaseDate:{
        type:String,
        require:true
    },
    director:{
        type:String,
        required:true
    },
    releasedStatus:{
        type:String,
        required:true,
        default:"RELEASED"
    }
},{timestamps:true});



const Movie = mongoose.model("Movie",movieSchema); //creates a new model 

module.exports = Movie; //return the model

