const express = require("express");
const cors = require("cors");

const jsonMiddleware = express.json();
const corsMiddleware = cors();
const headersMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

module.exports = {
  jsonMiddleware,
  corsMiddleware,
  headersMiddleware,
};
