require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const routes = require("./src/routes");
const app = express();
const path = require("path");
const errorHandler = require('./src/middlewares/errorHandler');

global._srcImage = `${__dirname}/upload`

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/home-decor/api", routes);
app.use(errorHandler);
app.use('/upload/user', express.static(path.join(__dirname, '/upload/user')));
app.use('/upload/post', express.static(path.join(__dirname, '/upload/post')));
module.exports = app;
