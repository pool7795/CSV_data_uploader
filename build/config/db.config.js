"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env["PGUSER"],
    host: process.env["PGHOST"],
    database: process.env["PGNAME"],
    password: process.env["PGPASSWORD"],
    port: Number(process.env["PGPORT"]),
});
exports.default = pool;
