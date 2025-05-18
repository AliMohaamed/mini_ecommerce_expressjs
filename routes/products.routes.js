const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  replaceProduct,
  searchProduct,
} = require("../controllers/ProductsController");
const validate = require("../middleware/validate.middleware.js");
const { createProductSchema } = require("../validation/product.validation.js");

const router = express.Router();
router.get("/", getProducts);
router.get("/search", searchProduct);
router.get("/:id", getProductById);
router.post("/", validate(createProductSchema), addProduct);
router.put("/:id", validate(createProductSchema), replaceProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
