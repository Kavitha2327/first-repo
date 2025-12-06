var express = require("express");


var data = [
  {
    username: "kavitha",
    password: "kavitha123",
  },
  {
    username: "gowtami",
    password: "gowtami123",
  },
  {
    username: "siri",
    password: "siri123",
  },
];

const postData = (req, res) => {
  const { userName, password } = req.body;
  const user = data.find((each) => each.username === userName);
  if (!user) {
    return res.status(404).send("username invalid");
  }
  if (user.password != password) {
    return res.status(404).send("invalid password");
  }
  return res.status(201).send("login successful");
};

exports.postData = postData;
