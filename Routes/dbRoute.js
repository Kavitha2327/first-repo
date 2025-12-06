var express = require("express");
const route = express.Router();
const dbController = require("../Controllers/dbController");
route.post("/data", dbController.postData);
route.post("/login", dbController.login);
route.post("/forget", dbController.forget);
route.post("/user", dbController.users);
route.post("/upload", dbController.uploadData);
route.post("/delete", dbController.deleteData);

module.exports = route;
