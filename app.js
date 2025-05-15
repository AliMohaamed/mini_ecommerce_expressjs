const express = require("express");
const dotenv = require("dotenv");

const { appRouter } = require("./app.router.js");
const { connectionDB } = require("./DB/connection.js");

dotenv.config();
const app = express();

connectionDB(app);

appRouter(app, express);
