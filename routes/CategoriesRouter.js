const express = require("express");
const {
  getCategories,
  addCategories,
  getAllProductByCategory,
} = require("../controllers/CategoriesController.js");

const { createCategorySchema } = require("../validation/CategoryValidation.js");
const validate = require("../middleware/ValidateMiddleware.js");
const { protect, authorizeRole } = require("../middleware/AuthMiddleware.js");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id/products", getAllProductByCategory);
router.post(
  "/",
  protect,
  validate(createCategorySchema),
  protect,
  authorizeRole("admin"),
  addCategories
);

module.exports = router;
