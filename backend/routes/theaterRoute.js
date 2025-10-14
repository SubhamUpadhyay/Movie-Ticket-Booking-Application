
const express = require("express");
const { createTheater, getAllTheaters, getTheatersByCity } = require("../controllers/theaterController");
const { authenticate, isAdmin } = require("../middlewares/auth");
const theaterRoute = express.Router();

theaterRoute.post("/create", authenticate, isAdmin, createTheater);
theaterRoute.get("/all", getAllTheaters);
theaterRoute.get("/city/:city", getTheatersByCity);

module.exports = theaterRoute;

const express = require("express");
const { createShow, getShowsByMovie, getShowsByTheater } = require("../controllers/showController");
const { authenticate, isAdmin } = require("../middlewares/auth");
const showRoute = express.Router();

showRoute.post("/create", authenticate, isAdmin, createShow);
showRoute.get("/movie/:movieId", getShowsByMovie);
showRoute.get("/theater/:theaterId", getShowsByTheater);

module.exports = showRoute;