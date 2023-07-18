const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const dbConnect = require("./config/db/dbConnect");
const routes = require("./routes");
const app = express();
const path= require("path")
//cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static(path.join(__dirname,"uploads")))
app.use(routes);
//DB
dbConnect();
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8000);
