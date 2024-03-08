const express = require("express");
const { generateOrderNumber } = require("../modules/orderNumber");
const app = express.Router();

app.route("/orderNumber").get(async (req, res) => {
  try {
    const orderNumber = await generateOrderNumber();
    res.json({ orderNumber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
