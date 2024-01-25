const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");

const constants = require("./helpers/constants");
const apiResponse = require("./helpers/api-response");

const routes = require("./routes");

require("./models/index");

const app = express();

// compress all responses
app.use(compression());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

/**
 * API routes
 */

app.use("/", routes);

/**
 * Catch 404 and forward to error handler
 */

app.use((req, res, next) => {
  next(createError(404));
});

/**
 * Error handler
 */

app.use(async (err, req, res, next) => {
  const payload = constants.error(
    err.status || 500,
    err.message || "Something went wrong",
    err
  );

  await apiResponse(req, res, payload);
});

module.exports = app;
