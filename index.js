// error in login mongo:
// docker-compose up --build --force-recreate --renew-anon-volumes
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require('cors')
// //mongo

app.use(cors());
mongoose.connect("mongodb://root:example@mongo:27017/curso?authSource=admin", {
  autoReconnect: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on("error", err => {
  throw new Error(err);
});

db.once("open", () => {
  console.log("conected");
});

//routes
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(bodyParser.json());
app.use(routes);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
