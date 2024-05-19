import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env["PGUSER"],
  host: process.env["PGHOST"],
  database: process.env["PGNAME"],
  password: process.env["PGPASSWORD"],
  port: Number(process.env["PGPORT"]),
});

export default pool;
