const express = require("express");
const main = require("./db/mongo");
require("dotenv").config();
const app = express(); //express application object

const PORT = process.env.PORT;

async function connect_server() {
  await main();

  app.listen(PORT, () => {
    console.log(`Listening at PORT no ${PORT}`);
  });
}

connect_server();
