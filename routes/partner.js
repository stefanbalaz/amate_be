const express = require("express");
const {
  createPartner,
  registerPartner,
  loginPartner,
  getAllPartners,
  getPartnerById,
} = require("../controllers/partner");
const app = express.Router();

/* app.route("/").post(createPartner).get(getAllPartners); */

/* app.route("/").post(createPartner);
app.route("/register").post(registerPartner); */
app.route("/create").post(createPartner);
app.route("/register").post(registerPartner);
app.route("/login").post(loginPartner);
app.route("/").get(getAllPartners);
app.route("/:id").get(getPartnerById);

// User Login

module.exports = app;
