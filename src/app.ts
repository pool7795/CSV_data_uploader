import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import csvRoutes from "./routes/csvRoutes";
import authRoutes from "./routes/authRoutes";
import dataRouter from "./routes/dataRoutes";
import cors from "cors"; // Importa el módulo de CORS

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de CORS
app.use(cors());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/csv", csvRoutes);
app.use("/api/data", dataRouter);

export default app;
