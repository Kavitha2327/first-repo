var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var firstRoute = require("./Routes/firstroute");
var loginRoute = require("./Routes/loginRoute");
var dbRoute = require("./Routes/dbRoute");
var cors = require("cors");
var dataBase = require("./data");
const PORT = process.env.PORT || 9000;

var app = express();

app.use(
  cors({
    origin: "https://frontendsignin.vercel.app",
    methods: ["GET", "POST"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use("/", firstroute);
app.use("/", dbRoute);
app.use("/", loginRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const fun = async () => {
  try {
    await dataBase();
    console.log("connected to DataBase");
    app.listen(PORT, "0.0.0.0", function () {
      console.log("Server started at 9000 port");
      console.log("testing");
    });
  } catch (err) {
    console.log(err);
  }
};
fun();

app.get("/", (req, res) => {
  res.send("the server is running");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("message");
});

module.exports = app;
