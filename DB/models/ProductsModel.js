const mongoose = require("mongoose");

// Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
// Model
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
