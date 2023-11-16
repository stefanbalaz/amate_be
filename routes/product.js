const express = require("express");
const { getAllProducts } = require("../controllers/product");
const app = express.Router();

app.route("/").get(getAllProducts);

module.exports = app;
