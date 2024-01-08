const express = require("express");
const { getAllProducts, getProductById } = require("../controllers/product");
const app = express.Router();

app.route("/").get(getAllProducts);
app.route("/:id").get(getProductById);

module.exports = app;
