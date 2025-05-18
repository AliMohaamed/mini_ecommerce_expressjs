const express = require("express");
const {
  cartUser,
  addProductToCart,
  updateProductToCart,
  deleteProductToCart,
  deleteCartUser,
} = require("../controllers/CartController");
const validate = require("../middleware/validate.middleware.js");
const { cartItemSchema } = require("../validation/cart.validation.js");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/:userId", cartUser);
router.post("/:userId/items", validate(cartItemSchema), addProductToCart);
router.patch("/:userId/items/:productId", protect, updateProductToCart);
router.delete("/:userId/items/:productId", protect, deleteProductToCart);
router.delete("/:userId", protect,deleteCartUser);

module.exports = router;
