var express = require("express");
const route = express.Router();
const loginController = require("../Controllers/loginController");
route.post("/login", loginController.postData);

module.exports = route;
