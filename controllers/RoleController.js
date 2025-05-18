const Role = require("../DB/models/RoleModel.js");
const ApiError = require("../helper/ApiError.js");
const { asyncHandler } = require("../helper/asyncHandler.js");
const { sendResponse } = require("../helper/sendResponseHelper.js");

// Get All Roles
const allRoles = asyncHandler(async (req, res, next) => {
  const roles = await Role.find({});
  const rolesArray = roles.map((role) => role.name);
  return sendResponse(res, 200, true, "All Roles", rolesArray);
});

// Create a new role
const createRole = asyncHandler(async (req, res, next) => {
  const existRole = await Role.findOne({ name: req.body.name });
  if (existRole) return next(new ApiError(400, "role already exist"));
  const role = await Role.create({ name: req.body.name });
  return sendResponse(res, 200, true, "Create a new role successfully", role);
});

module.exports = { allRoles, createRole };
