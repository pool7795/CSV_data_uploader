"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const csvRoutes_1 = __importDefault(require("./routes/csvRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const cors_1 = __importDefault(require("cors")); // Importa el módulo de CORS
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Middleware de CORS
app.use((0, cors_1.default)());
// Swagger setup
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/csv", csvRoutes_1.default);
app.use("/api/data", dataRoutes_1.default);
exports.default = app;
