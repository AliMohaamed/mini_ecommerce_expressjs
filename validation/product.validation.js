const Joi = require("joi");
const { isValidObjectId } = require("../helper/isValidObjectId.js");

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.string().custom(isValidObjectId),
});

module.exports = { createProductSchema };
