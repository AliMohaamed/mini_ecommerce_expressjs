require("dotenv").config();
const {
  createCategorySchema,
} = require("../validation/category.validation.js");
const { createProductSchema } = require("../validation/product.validation.js");
const j2s = require("joi-to-swagger");

const { swagger: productSwaggerSchema } = j2s(createProductSchema);
const { swagger: categorySwaggerSchema } = j2s(createCategorySchema);

const baseUrl = process.env.BASE_URL || "http://localhost:5000";

const openApiDocument = {
  openapi: "3.0.0",
  info: {
    title: "E-commerce API",
    version: "1.0.0",
    description: "mini e-commerce",
  },
  servers: [
    {
      url: baseUrl,
    },
  ],
  paths: {
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "Get all products",
        description: "Returns a list of all products",
        responses: {
          200: {
            description: "A list of products",
            content: {
              "application/json": {
                // Will be used for JSON responses
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    items: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Create a new product",
        description: "Creates a new product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          400: {
            description: "Invalid input",
          },
        },
      },
    },
    "/api/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Get a product by ID",
        description: "Returns a single product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the product to retrieve",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "A single product",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          404: {
            description: "Product not found",
          },
        },
      },
      put: {
        tags: ["Products"],
        summary: "Update a product by ID",
        description: "Updates an existing product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the product to update",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          400: {
            description: "Invalid input",
          },
          404: {
            description: "Product not found",
          },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Delete a product by ID",
        description: "Deletes a product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the product to delete",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "Product deleted successfully",
          },
          404: {
            description: "Product not found",
          },
        },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        description: "Returns a list of all categories",
        responses: {
          200: {
            description: "A list of categories",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    items: {
                      $ref: "#/components/schemas/Category",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Categories"],
        summary: "Create a new category",
        description: "Creates a new category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Category",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Category created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Category",
                },
              },
            },
          },
          400: {
            description: "Invalid input",
          },
        },
      },
    },
    "/api/categories/{id}/products": {
      get: {
        tags: ["Categories"],
        summary: "Get all products in a category",
        description: "Returns a list of all products in a category",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the category to retrieve products from",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "A list of products in the category",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    items: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Category not found",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: productSwaggerSchema,
      Category: categorySwaggerSchema,
    },
  },
};

module.exports = openApiDocument;
