const express = require("express");
const morgan = require("morgan");

// import all routes
const productRoutes = require("./routes/ProductsRouter.js");
const categoryRoutes = require("./routes/CategoriesRouter.js");
const userRoutes = require("./routes/UsersRouter.js");
const cartRoutes = require("./routes/CartRouter.js");
const authRoutes = require("./routes/AuthRouter.js");
const roleRoutes = require("./routes/RoleRouter.js");
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
  app.use("/api", roleRoutes);

  // not found page router
  app.all("/{*any}", (req, res, next) => {
    return next(new ApiError(400, "Page not found"));
  });
  // Error Handler
  app.use(errorHandler);
};
