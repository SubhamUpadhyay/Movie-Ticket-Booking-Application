const mongoose =  require("mongoose")
const env = require("dotenv");
const Movie = require("../models/movieModel");
env.config();
async function  main() {
    try{
        await mongoose.connect(process.env.MONGOSTRING);
        console.log("MONGO DB connected");
        // await Movie.create({
        //     name:"flim1",
        //     description:"This is flim1",
        //     casts:["ABC","BCD","CDE"],
        //     trailerUrl:"https://www.youtube.com/flim1",
        //     langugae:["Nepali","english","hindi"],
        //     releaseDate:'2025-10-14',
        //     director:"XYZ",
        //     releasedStatus:"RELEASED"
        // })
    }catch(err)
        {
            console.log('Error caught:'+err);
        }
}


module.exports = main;