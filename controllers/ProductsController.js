const { products } = require("../data.js");
const Products = require("../DB/models/ProductsModel.js");
const { sendResponse } = require("../helper/sendResponseHelper.js");
const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    sendResponse(res, 200, true, "Products retrieved successfully", products);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) return sendResponse(res, 404, false, "Product not found");
    sendResponse(res, 200, true, "Product retrieved successfully", product);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
const addProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    sendResponse(res, 201, true, "Product created successfully", product);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;
    let product = await Products.findByIdAndUpdate(
      { _id: id },
      { name, price, categoryId }
    );
    if (!product) return sendResponse(res, 404, false, "product not found");
    sendResponse(res, 200, true, "Product updated successfully", product);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
const replaceProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;
    let product = await Products.findByIdAndUpdate(
      { _id: id },
      { name, price, categoryId }
    );
    if (!product) return sendResponse(res, 404, false, "product not found");

    sendResponse(res, 200, true, "Product updated successfully", product);
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);
    if (!product) return sendResponse(res, 404, false, "Product not found");

    sendResponse(res, 200, true, "Product deleted successfully");
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};
// Search products with advanced filtering
const searchProduct = async (req, res) => {
  try {
    const {
      keyword = "",
      minPrice,
      maxPrice,
      categoryId,
      sortBy = "price",
      order = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    // Build the query
    const query = {};

    // Keyword search (name)
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Category filter
    if (categoryId) {
      query.categoryId = categoryId;
    }

    // Sort options
    const sortOptions = {};
    if (sortBy === "name") {
      sortOptions.name = order === "asc" ? 1 : -1;
    } else {
      sortOptions.price = order === "asc" ? 1 : -1;
    }

    // Execute the query with pagination
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Products.find(query).sort(sortOptions).skip(skip).limit(Number(limit)),
      Products.countDocuments(query),
    ]);

    if (products.length === 0) {
      return sendResponse(
        res,
        404,
        false,
        "No products found matching your criteria"
      );
    }

    sendResponse(res, 200, true, "Products retrieved successfully", {
      page: Number(page),
      limit: Number(limit),
      totalResults: total,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal server error");
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  replaceProduct,
  searchProduct,
};
