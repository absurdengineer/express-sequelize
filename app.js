//? Load Modules
const express = require("express");
require("dotenv").config();

//? Start Server
const app = express();

//? Start Ups
require("./startups/config.startup");
require("./startups/routers.startup")(app);

//? Settings
const port = process.env.PORT || 8080;

//? Listener
app.listen(port, () => {
  console.log(`Node server is up and running on port ${port}`);
  console.log(`Development Server started at http://localhost:${port}`);
  console.log(`Requesting to connect database...`);
});
