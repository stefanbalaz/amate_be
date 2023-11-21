const express = require("express");
const { getAllOrders, createOrder } = require("../controllers/order");
const app = express.Router();

app.route("/").post(createOrder).get(getAllOrders);

module.exports = app;
