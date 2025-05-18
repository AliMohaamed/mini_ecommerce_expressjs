const express = require("express");
const {
  getCategories,
  addCategories,
  getAllProductByCategory,
} = require("../controllers/CategoriesController");

const {
  createCategorySchema,
} = require("../validation/category.validation.js");
const validate = require("../middleware/validate.middleware.js");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id/products", getAllProductByCategory);
router.post("/", protect, validate(createCategorySchema), addCategories);

module.exports = router;
