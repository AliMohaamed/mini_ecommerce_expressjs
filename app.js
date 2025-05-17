const express = require("express");
const dotenv = require("dotenv");

const { appRouter } = require("./app.router.js"),
  { connectionDB } = require("./DB/connection.js"),
  path = require("path"),
  swaggerUi = require("swagger-ui-express");
const openApiDocument = require("./swagger/openapi.js");

dotenv.config();
const app = express();

connectionDB(app);

//! Swagger

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/swagger.json", express.static(path.join(__dirname, "swagger.json")));

appRouter(app, express);
