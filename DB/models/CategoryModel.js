const mongoose = require("mongoose");

// Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
// model
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
module.exports = Category;
