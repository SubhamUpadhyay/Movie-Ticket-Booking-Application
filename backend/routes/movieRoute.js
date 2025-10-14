const  {createMovie,deleteMovie,findandReturn} = require("../controllers/movieController");
const express =   require("express");
const { validateMovie } = require("../middlewares/validators/movieValidator");
const movieRoute = express.Router();
const {authenticate,isAdmin} = require("../middlewares/auth");


movieRoute.post("/create",authenticate,isAdmin,validateMovie,createMovie);
movieRoute.delete("/delete",authenticate,isAdmin,deleteMovie);
movieRoute.post("/find",findandReturn);