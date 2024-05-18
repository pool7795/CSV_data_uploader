import { Pool } from "pg";

const pool = new Pool({
  user: process.env["DB_USER"] || "paul",
  host: process.env["DB_HOST"] || "localhost",
  database: "csv_data",
  password: process.env["DB_PASSWORD"] || "gatito",
  port: 5432,
});

export default pool;
