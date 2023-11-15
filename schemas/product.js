const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    enum: [
      "mate classic",
      "mate melon",
      "mate mint",
      "mate ginger",
      "mate hemp",
    ],
    required: true,
  },
  productFlavour: {
    type: String,
    enum: ["classic", "melon", "mint", "ginger", "hemp"],
    required: true,
  },
  productShortDescription: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productPicture: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
