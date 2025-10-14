const {register,login} = require("../controllers/authController")
const express =require("express")
const authRoute = express.Router();
const { authLimiter } = require("../middlewares/rateLimiter");

authRoute.post("/register",register);
authRoute.post("/login",login);
authRoute.post("/login", authLimiter, login);

module.exports = authRoute;

