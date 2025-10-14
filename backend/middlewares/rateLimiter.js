const rateLimiter = require('express-rate-limit');

const apiLimter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:"Too many request , please try again later",
    standardHeaders:true,
    legacyHeaders:false
});

const authLimiter = rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:"Too many login attemps , please try again later"
});

module.exports = {apiLimter,authLimiter};