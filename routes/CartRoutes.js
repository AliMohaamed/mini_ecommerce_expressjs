const express = require("express");
const {
  cartUser,
  addProductToCart,
  updateProductToCart,
  deleteProductToCart,
  deleteCartUser,
} = require("../controllers/CartController");
const validate = require("../middleware/ValidateMiddleware.js");
const { cartItemSchema } = require("../validation/CartValidation.js");

const router = express.Router();

router.get("/:userId", cartUser);
router.post("/:userId/items", validate(cartItemSchema), addProductToCart);
router.patch("/:userId/items/:productId", updateProductToCart);
router.delete("/:userId/items/:productId", deleteProductToCart);
router.delete("/:userId", deleteCartUser);

module.exports = router;
