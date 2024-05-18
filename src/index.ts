import express from "express";
import dotenv from "dotenv";
import { QueryResult } from "pg";
import pool from "./config/db.config";
import csvRoutes from "./routes/csvRoutes"; // Importa el archivo de rutas CSV
import { login } from "./middleware/authController";
import dataRouter from "./routes/dataRoutes";

dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 3000;

app.use(express.json());

pool.query("SELECT NOW()", (err: Error, res: QueryResult<any>) => {
  if (err) {
    console.error("Error executing query:", err);
  } else {
    console.log("Query result:", res.rows);
  }
});

// Authentication endpoint
app.post("/login", login);

// Usar rutas CSV
app.use("/api/csv", csvRoutes);
app.use("/api/data", dataRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
