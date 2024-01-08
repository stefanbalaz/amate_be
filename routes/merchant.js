const express = require("express");
const {
  createMerchant,
  getAllMerchants,
  getMerchantById,
} = require("../controllers/merchant");
const app = express.Router();

app.route("/").post(createMerchant).get(getAllMerchants);
app.route("/:id").get(getMerchantById);

module.exports = app;
