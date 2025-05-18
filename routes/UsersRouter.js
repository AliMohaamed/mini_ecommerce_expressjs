const express = require("express");
const {
  getUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
  assignRolesToUser,
} = require("../controllers/UsersController.js");
const { createUserSchema } = require("../validation/UserValidation.js");
const { protect, authorizeRole } = require("../middleware/AuthMiddleware.js");

const router = express.Router();

router
  .route("/")
  .all(protect, authorizeRole("Admin"))
  .get(getUsers)
  .post(addUser);
router
  .route("/:id")
  .all(protect, authorizeRole("Admin"))
  .get(getUsersById)
  .delete(deleteUser)
  .put(updateUser);

router.patch("/:id/roles", assignRolesToUser);

module.exports = router;
