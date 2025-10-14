const express = require("express");
const main = require("./db/mongo");



const movieRoute = require("./routes/movieRoute");
const authRoute = require("./routes/authRoute");
const theaterRoute = require("./routes/theaterRoute");
const showRoute = require("./routes/showRoute");

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
const PORT = process.env.PORT||4000;

async function connect_server() {
  await main();

  app.listen(PORT, () => {
    console.log(`Listening at PORT no ${PORT}`);
  });
}

connect_server();
