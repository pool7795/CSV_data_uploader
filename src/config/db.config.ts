import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env["DB_USER"] || "paul",
  host: process.env["DB_HOST"] || "localhost",
  database: process.env["DB_NAME"] || "csv_data",
  password: process.env["DB_PASSWORD"] || "gatito",
  port: parseInt(process.env["DB_PORT"] || "5432", 10),
});

export default pool;
