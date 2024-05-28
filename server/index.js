const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

const PORT = process.env.PORT;

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDb Connected");
});

// Controllers

require("./controllers/authController")(app);
require("./controllers/userController")(app);

// start the server
app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT || 3000}`);
});
