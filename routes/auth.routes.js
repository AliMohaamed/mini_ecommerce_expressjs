const { Router } = require("express");
const { register, login } = require("../controllers/AuthController.js");
const {
  registerSchema,
  loginSchema,
} = require("../validation/user.validation.js");
const validate = require("../middleware/validate.middleware.js");

const router = Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);

module.exports = router;
