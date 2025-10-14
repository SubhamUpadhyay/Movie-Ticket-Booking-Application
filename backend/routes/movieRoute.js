const  {createMovie,deleteMovie,findandReturn} = require("../controllers/movieController");
const express =   require("express")
const movieRoute = express.Router();


movieRoute.post("/create",createMovie);
movieRoute.delete("/delete",deleteMovie);
movieRoute.post("/find",findandReturn);