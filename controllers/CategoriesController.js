const Category = require("../DB/models/CategoryModel.js");
const { sendResponse } = require("../helper/sendResponseHelper.js");
const Products = require("../DB/models/ProductsModel.js");
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    sendResponse(
      res,
      200,
      true,
      "Categories retrieved successfully",
      categories
    );
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

const addCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory)
      return sendResponse(res, 409, false, "Category already exists");

    const category = await Category.create({ name });
    sendResponse(res, 201, true, "Category created successfully", category);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

const getAllProductByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({ _id: id });
    if (!category) return sendResponse(res, 409, false, "category not found");
    const allProductByCategory = await Products.find({
      categoryId: category._id,
    });
    if (!allProductByCategory)
      return sendResponse(res, 409, false, "No Exist Products");
    res.status(200).json({ success: true, message: allProductByCategory });
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

module.exports = { getCategories, addCategories, getAllProductByCategory };
