const Joi = require("joi");
const { isValidObjectId } = require("../helper/isValidObjectId.js");

// Validation for cart item
const cartItemSchema = Joi.object({
  productId: Joi.string().custom(isValidObjectId).required(),
  quantity: Joi.number().integer().min(1).default(1).required(),
});

// Validation for creating/updating cart
const cartSchema = Joi.object({
  userId: Joi.string().custom(isValidObjectId, "valid ObjectId").required(),
  items: Joi.array().items(cartItemSchema).min(1).required(),
});

// Validation for adding/updating a single item
const cartItemOperationSchema = Joi.object({
  productId: Joi.string().custom(isValidObjectId, "valid ObjectId").required(),
  quantity: Joi.number().integer().min(1).default(1),
});

module.exports = {
  cartSchema,
  cartItemSchema,
  cartItemOperationSchema,
};
