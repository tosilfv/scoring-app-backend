const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const coursesRoutes = require("./routes/courses-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/courses", coursesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    app.listen(config.PORT);
    console.log(`Connected to MongoDB.\nListening on port: ${config.PORT}`);
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });
