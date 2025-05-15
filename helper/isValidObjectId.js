const mongoose = require("mongoose");

exports.isValidObjectId = (value, helper) =>
  mongoose.Types.ObjectId.isValid(value)
    ? true
    : helper.message("Invalid Object ID");
