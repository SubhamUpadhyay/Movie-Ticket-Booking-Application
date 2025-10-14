const express = require("express");
const { createTheater, getAllTheaters, getTheatersByCity } = require("../controllers/theaterController");
const { authenticate, isAdmin } = require("../middlewares/auth");
const theaterRoute = express.Router();

theaterRoute.post("/create", authenticate, isAdmin, createTheater);
theaterRoute.get("/all", getAllTheaters);
theaterRoute.get("/city/:city", getTheatersByCity);

module.exports = theaterRoute;