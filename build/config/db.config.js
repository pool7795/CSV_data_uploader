"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env["DB_USER"] || "paul",
    host: process.env["DB_HOST"] || "localhost",
    database: process.env["DB_NAME"] || "csv_data",
    password: process.env["DB_PASSWORD"] || "gatito",
    port: parseInt(process.env["DB_PORT"] || "5432", 10),
});
exports.default = pool;
