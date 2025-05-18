const express = require("express");
const {
  getUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/UsersController");
const { createUserSchema } = require("../validation/user.validation.js");
const validate = require("../middleware/validate.middleware.js");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", protect, getUsers);
router.get("/:id", protect, getUsersById);
router.post("/", protect, addUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
