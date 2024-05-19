"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./config/db.config"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Agregamos las rutas de autenticación
const csvRoutes_1 = __importDefault(require("./routes/csvRoutes"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5500;
app.use(express_1.default.json());
db_config_1.default.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Error executing query:", err);
    }
    else {
        console.log("Query result:", res.rows);
    }
});
// Usar rutas de autenticación, CSV y de datos
app.use("/api/auth", authRoutes_1.default);
app.use("/api/csv", csvRoutes_1.default);
app.use("/api/data", dataRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
