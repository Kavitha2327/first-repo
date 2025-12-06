const mongoose = require("mongoose");

const userdata = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("SignIn", userdata);

const image = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Profile: {
    type: String,
    required: true,
  },
});

const userImage = mongoose.model("Image", image);

module.exports = { user, userImage };
