require("dotenv").config();

const express = require("express");
const app = express();

var cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URL = 'mongodb+srv://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@lms.ebhxa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log('Connected to Database'));

//CORS
app.use(cors());
//Receive body request
app.use(bodyParser.json());

const usersRouter = require('./routes/users');
//http://localhost:4000/users
app.use("/users", usersRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
