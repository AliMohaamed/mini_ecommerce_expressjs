const { body, validationResult } = require("express-validator");
const createRoleValidation = [
  body("name").notEmpty().withMessage("Name is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateCreateRole = [...createRoleValidation, validate];
module.exports = {
  createRoleValidation,
  validate,
  validateCreateRole,
};
