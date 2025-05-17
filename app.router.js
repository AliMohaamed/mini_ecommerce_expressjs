const express = require("express");
const morgan = require("morgan");

// import all routes
const productRoutes = require("./routes/products.routes");
const categoryRoutes = require("./routes/categories.routes");
const userRoutes = require("./routes/users.routes");
const cartRoutes = require("./routes/cart.routes");

exports.appRouter = (app) => {
  app.use(express.json());
  app.use(morgan(":method :url :response-time ms"));

  app.use("/api/products", productRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/cart", cartRoutes);

  // not found page router
  app.all("/{*any}", (req, res, next) => {
    return res.status(400).json({ success: false, message: "Page not found" });
  });
  // Error Handler
  app.use((error, req, res, next) => {
    res.status(500).json({ message: `Error , ${error}` });
  });
};
