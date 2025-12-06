const express = require("express");
const { connect } = require("mongoose");
const dataBase = async () => {
  try {
    await connect(
      "mongodb+srv://kavithaSudharshan:kavithaSudharshan123@kavitha.lpntuae.mongodb.net/"
    );
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dataBase;
