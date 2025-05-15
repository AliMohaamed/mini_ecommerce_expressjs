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

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/", validate(createUserSchema), addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
