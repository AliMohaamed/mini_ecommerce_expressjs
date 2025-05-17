const fs = require("fs");
const path = require("path");

const openApiDocument = require("./swagger/openapi");

const outputPath = path.join(__dirname, "swagger.json");

fs.writeFileSync(outputPath, JSON.stringify(openApiDocument, null, 2), "utf8");
