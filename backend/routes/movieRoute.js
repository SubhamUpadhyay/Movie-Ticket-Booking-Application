const  {createMovie,deleteMovie,findandReturn} = require("../controllers/movieController");
const express =   require("express");
const { validateMovie } = require("../middlewares/validators/movieValidator");
const movieRoute = express.Router();


movieRoute.post("/create",validateMovie,createMovie);
movieRoute.delete("/delete",deleteMovie);
movieRoute.post("/find",findandReturn);