const express = require("express");
const { createShow, getShowsByMovie, getShowsByTheater } = require("../controllers/showController");
const { authenticate, isAdmin } = require("../middlewares/auth");
const showRoute = express.Router();

showRoute.post("/create", authenticate, isAdmin, createShow);
showRoute.get("/movie/:movieId", getShowsByMovie);
showRoute.get("/theater/:theaterId", getShowsByTheater);

module.exports = showRoute;
