const express = require("express");
const { getAllOrders, createOrder } = require("../controllers/order");
const app = express.Router();

app.route("/").post(createOrder);

module.exports = app;
