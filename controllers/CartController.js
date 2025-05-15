const { sendResponse } = require("../helper/sendResponseHelper.js");
const Cart = require("../DB/models/Cart.model.js");
const User = require("../DB/models/User.model.js");

const cartUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartByUser = await Cart.findOne({ userId });
    if (!cartByUser) sendResponse(res, 404, false, "User id not found");
    sendResponse(res, 200, true, "Carts retrieved successfully", cartByUser);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
const addProductToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (quantity <= 0)
      return sendResponse(
        res,
        400,
        false,
        "Quantity must be greater than zero"
      );

    const user = await User.findById(userId);
    if (!user) return sendResponse(res, 404, false, "User not found");

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId: user._id,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1)
        cart.items[existingItemIndex].quantity += quantity;
      else cart.items.push({ productId, quantity });

      await cart.save();
    }

    sendResponse(res, 200, true, "Product added to cart successfully", cart);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
const updateProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0)
      sendResponse(res, 400, false, "Quantity must be greater than zero");

    const cartByUser = await Cart.findOne({ userId });
    if (!cartByUser)
      return sendResponse(res, 404, false, "Cart not found for this user");

    const existingItemIndex = cartByUser.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existingItemIndex == -1)
      return sendResponse(res, 404, false, "Product not found in cart");

    cartByUser.items[existingItemIndex].quantity = Number(quantity);
    const cart = await cartByUser.save();

    return sendResponse(res, 200, true, "Product Updated Successfully", cart);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
const deleteProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cartByUser = await Cart.findOne({ userId });

    if (!cartByUser) sendResponse(res, 404, false, "User id not found");
    const existingItemIndex = cartByUser.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex == -1)
      return sendResponse(res, 404, false, "Product not found in cart");

    cartByUser.items.splice(existingItemIndex, 1);

    const cart = await cartByUser.save();

    sendResponse(
      res,
      200,
      true,
      "Product removed from cart successfully",
      cart
    );
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

const deleteCartUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartByUser = await Cart.findOneAndDelete({ userId });
    if (!cartByUser) return sendResponse(res, 404, false, "User id not found");
    return res
      .status(200)
      .json({ success: true, message: `Clear all cart done` });
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

module.exports = {
  cartUser,
  addProductToCart,
  updateProductToCart,
  deleteProductToCart,
  deleteCartUser,
};
