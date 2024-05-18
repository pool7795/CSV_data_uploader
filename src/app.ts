// src/app.ts

import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import csvRoutes from "./routes/csvRoutes";
import authRoutes from "./routes/authRoutes";
import dataRouter from "./routes/dataRoutes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/csv", csvRoutes);

export default app;
