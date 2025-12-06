var express = require('express');
const route = express.Router();
const firstController = require("../Controllers/firstController")
route.get("/first-api",firstController.GetData);
route.post("/post-api" ,firstController.PostData);

module.exports = route;