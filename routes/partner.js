const express = require("express");
const { createPartner } = require("../controllers/partner");
const app = express.Router();

app.route("/").post(createPartner);

module.exports = app;
