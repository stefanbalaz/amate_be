const express = require("express");
const {
  getAllOrders,
  createOrder,
  getOneOrder,
  updateOrder,
} = require("../controllers/order");

const app = express.Router();

app.route("/").post(createOrder).get(getAllOrders);

app.route("/:orderId").put(updateOrder).get(getOneOrder);

module.exports = app;
