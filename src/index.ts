import express from "express";
import dotenv from "dotenv";
import { QueryResult } from "pg";
import pool from "./config/db.config";
import authRoutes from "./routes/authRoutes"; // Agregamos las rutas de autenticación
import csvRoutes from "./routes/csvRoutes";
import dataRouter from "./routes/dataRoutes";

dotenv.config();

const app = express();
const PORT = 5500;

app.use(express.json());

pool.query("SELECT NOW()", (err: Error, res: QueryResult<any>) => {
  if (err) {
    console.error("Error executing query:", err);
  } else {
    console.log("Query result:", res.rows);
  }
});

// Usar rutas de autenticación, CSV y de datos
app.use("/api/auth", authRoutes);
app.use("/api/csv", csvRoutes);
app.use("/api/data", dataRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
