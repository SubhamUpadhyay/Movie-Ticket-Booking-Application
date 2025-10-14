const mongoose =  require("mongoose")
const env = require("dotenv");
env.config();
async function  main() {
    try{
        await mongoose.connect(process.env.MONGOSTRING);
        console.log("MONGO DB connected");
    }catch(err)
        {
            console.log('Error caught:'+err);
        }
}


module.exports = main;