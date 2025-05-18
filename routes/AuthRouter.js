const { Router } = require("express");
const { register, login } = require("../controllers/AuthController.js");
const {
  registerSchema,
  loginSchema,
} = require("../validation/UserValidation.js");
const validate = require("../middleware/ValidateMiddleware.js");

const router = Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);

module.exports = router;
