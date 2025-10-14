const express = require("express");
const { createBooking, getUserBookings, cancelBooking } = require("../controllers/bookingController");
const { authenticate } = require("../middlewares/auth");
const bookingRoute = express.Router();

bookingRoute.post("/create", authenticate, createBooking);
bookingRoute.get("/my-bookings", authenticate, getUserBookings);
bookingRoute.patch("/cancel/:bookingId", authenticate, cancelBooking);

module.exports = bookingRoute;