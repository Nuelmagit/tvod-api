// error in login mongo:
// docker-compose up --build --force-recreate --renew-anon-volumes
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require('cors')
// //mongo

app.use(cors());

app.use(routes);

app.listen(process.env.API_PORT, function() {
  console.log("Example app listening");
});
