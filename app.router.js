const express = require("express");
const morgan = require("morgan");

// import all routes
const productRoutes = require("./routes/products.routes");
const categoryRoutes = require("./routes/categories.routes");
const userRoutes = require("./routes/users.routes");
const cartRoutes = require("./routes/cart.routes");
const authRoutes = require("./routes/auth.routes.js");
const { errorHandler } = require("./middleware/errorHandler.middleware.js");
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
