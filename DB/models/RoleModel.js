const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      // enum: ["admin", "buyer", "customer", "user"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Role || mongoose.model("Role", roleSchema);
