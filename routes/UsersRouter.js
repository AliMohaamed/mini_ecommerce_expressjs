const express = require("express");
const {
  getUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/UsersController.js");
const { createUserSchema } = require("../validation/UserValidation.js");
const { protect } = require("../middleware/AuthMiddleware.js");

const router = express.Router();

router.get("/", protect, getUsers);
router.get("/:id", protect, getUsersById);
router.post("/", protect, addUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
