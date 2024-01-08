const express = require("express");
const {
  createPartner,
  getAllPartners,
  getPartnerById,
} = require("../controllers/partner");
const app = express.Router();

app.route("/").post(createPartner).get(getAllPartners);
app.route("/:id").get(getPartnerById);

module.exports = app;
