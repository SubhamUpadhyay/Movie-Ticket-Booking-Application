const Movie = require("../models/movieModel");

const createMovie = async(req,res)=>{
    try{
        const{name,description,casts,trailerUrl,language,releaseDate,director,releasedStatus} = req.body;
    if(!name||!description||!casts||!trailerUrl||!language||!releaseDate||!director||!releasedStatus) 
        return res.status(401).send("No enough information provied");
    const find_movie = await Movie.find({name});
    if(find_movie)  
        return res.status(409).send("Movie already exist");
    const newMovie = await Movie.create({name,description,casts,trailerUrl,language,releaseDate,director,releasedStatus});
    }catch(err)
    {
        return res.status(500).json({Error: "Error while creating movie"+err.message});
    }
}


const deleteMovie = async(req,res)=>{
    try{
        const {name}= req.body;
        if(!name)   
            res.status(402).send("Provide the movie name");
        const find_movie = await Movie.findOneAndDelete({name});
        if(!find_movie)
            res.send("Movie doesn't exist in database");
        else    
            res.send("Movie deleted Succesfully");

    }catch(err){
        res.send("Error in the deleteMovie API ",err);
    }
}


const findandReturn = async(req,res)=>{
    try{
        const {name} = req.body;
        if(!name)
            return res.status(401).send("Enter Valid name");
        const find_movie = await Movie.findOne({name});
        if(!find_movie) 
            return res.status(402).send("No movie found in the database");
        return res.json({
            name:find_movie.name,
            releaseDate:find_movie.releaseDate,
            director:find_movie.director,
            casts:find_movie.casts,
            description:find_movie.description
        });
    }catch(err){
        res.status(402).send("Error :"+err);
    }
}

module.exports = {createMovie,deleteMovie,findandReturn};