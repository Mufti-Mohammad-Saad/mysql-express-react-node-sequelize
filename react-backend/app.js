const express = require("express");
const cors = require("cors");

const sequelize = require("./database/database");
const router = require("./router");

const app = express();

app.use(cors());
app.use(router);
sequelize
  .sync()
  .then(() => {
    app.listen(8001);
  })
  .catch( err => {
    console.log("Error ! ", err);
  });
