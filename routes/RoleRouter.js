const { allRoles, createRole } = require("../controllers/RoleController.js");
const { Router } = require("express");
const { authorizeRole, protect } = require("../middleware/AuthMiddleware.js");
const {
  validateCreateRole,
} = require("../validation-express-validator/role.schema.js");

const router = Router();

router
  .route("/roles")
  .all(protect, authorizeRole("admin"))
  .get(allRoles)
  .post(validateCreateRole, createRole);

module.exports = router;
