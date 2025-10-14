const express = require("express");
const main = require("./db/mongo");
const cors = require('cors');
const helmet = require('helmet');



const movieRoute = require("./routes/movieRoute");
const authRoute = require("./routes/authRoute");
const theaterRoute = require("./routes/theaterRoute");
const showRoute = require("./routes/showRoute");
const bookingRoute = require("./routes/bookingRoute");
const { apiLimiter } = require("./middlewares/rateLimiter");
const morgan = require('morgan');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./middlewares/errorHandler');



require("dotenv").config();
const app = express(); //express application object
var cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/theaters",theaterRoute);
app.use("/api/shows",showRoute);
app.use("/api/movies",movieRoute);
app.use("/api/auth",authRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/", apiLimiter);



app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

app.use(notFound);
app.use(errorHandler);



app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));




const PORT = process.env.PORT||4000;

async function connect_server() {
  await main();

  app.listen(PORT, () => {
    console.log(`Listening at PORT no ${PORT}`);
  });
}

connect_server();
