const Role = require("../DB/models/RoleModel.js");
const User = require("../DB/models/UserModel.js");
const { asyncHandler } = require("../helper/asyncHandler.js");
const { sendResponse } = require("../helper/sendResponseHelper.js");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles", { name: 1, _id: 0 });
    sendResponse(res, 200, true, "Users retrieved successfully", users);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

// Get user by ID
const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("roles");
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }
    sendResponse(res, 200, true, "User retrieved successfully", user);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

// Add new user
const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return sendResponse(res, 409, false, "User already exists");

    const user = await User.create({ email, name });
    sendResponse(res, 201, true, "User created successfully", user);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;

    const updatedUser = await user.save();
    sendResponse(res, 200, true, "User updated successfully", updatedUser);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }
    sendResponse(res, 200, true, "User deleted successfully");
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

const assignRolesToUser = asyncHandler(async (req, res, next) => {
  const { roles } = req.body;
  const roleDocs = await Role.find({ name: { $in: roles } });
  if (!roleDocs.length) {
    return res.status(400).json({ message: "Invalid Roles" });
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      roles: roleDocs.map((r) => r._id),
    },
    { new: true }
  ).populate("roles");
  if (!user) return sendResponse(res, 404, false, "User not found");
  sendResponse(res, 201, true, "Roles assigned successfully", user);
});

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  getUsersById,
  updateUser,
  assignRolesToUser,
};
