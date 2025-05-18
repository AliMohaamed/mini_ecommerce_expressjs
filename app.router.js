const express = require("express");
const morgan = require("morgan");

// import all routes
const productRoutes = require("./routes/ProductsRoutes.js");
const categoryRoutes = require("./routes/CategoriesRoutes.js");
const userRoutes = require("./routes/UsersRoutes.js");
const cartRoutes = require("./routes/CartRoutes.js");
const authRoutes = require("./routes/AuthRoutes.js");
const { errorHandler } = require("./middleware/ErrorHandlerMiddleware.js");
const ApiError = require("./helper/ApiError.js");

exports.appRouter = (app) => {
  app.use(express.json());
  app.use(morgan(":method :url :response-time ms"));

  app.use("/api/products", productRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/auth", authRoutes);

  // not found page router
  app.all("/{*any}", (req, res, next) => {
    return next(new ApiError(400, "Page not found"));
  });
  // Error Handler
  app.use(errorHandler);
};
