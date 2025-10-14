const express = require("express");
const main = require("./db/mongo");
const movieRoute = require("./routes/movieRoute");
require("dotenv").config();
const app = express(); //express application object

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/movies",movieRoute);

const PORT = process.env.PORT||4000;

async function connect_server() {
  await main();

  app.listen(PORT, () => {
    console.log(`Listening at PORT no ${PORT}`);
  });
}

connect_server();
