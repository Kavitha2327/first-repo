const mongoose = require("mongoose");

const test = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model("test", test);
