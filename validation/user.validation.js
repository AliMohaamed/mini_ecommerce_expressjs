const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});
const registerSchema = Joi.object({
  name: Joi.string().min(3).required().description("The name of user"),
  email: Joi.string().email().required().description("The Email of user"),
  password: Joi.string().required().description("The password of user"),
  rePassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .description("The rePassword of user"),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required().description("The Email of user"),
  password: Joi.string().required().description("The password of user"),
});

module.exports = { createUserSchema, registerSchema, loginSchema };
