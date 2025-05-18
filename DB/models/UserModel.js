const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const ApiError = require("../../helper/ApiError.js");

// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        // required: true,
      },
    ],
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
// pre('save'): This hook is called before saving a user to the database.
// It hashes the password using bcryptjs if the password has been modified.
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare the entered password with the hashed password in the database
// matchPassword(): This method compares the entered password with the hashed password stored in the database.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Model
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
