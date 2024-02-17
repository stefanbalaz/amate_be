const express = require("express");
const {
  createPartner,
  registerPartner,
  loginPartner,
  logoutPartner,
  getAllPartners,
  getPartnerById,
} = require("../controllers/partner");
const app = express.Router();

app.route("/create").post(createPartner);
app.route("/register").post(registerPartner);
app.route("/login").post(loginPartner);
app.route("/logout").post(logoutPartner);
app.route("/").get(getAllPartners);
app.route("/:id").get(getPartnerById);

module.exports = app;
