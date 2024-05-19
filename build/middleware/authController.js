"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.authenticateHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const db_config_1 = __importDefault(require("../config/db.config"));
const jwtSecret = process.env["JWT_SECRET_KEY"] || "ultra-secret"; // Corregido aquí
async function authenticateHandler(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new error_1.ApiError("No autorizado", 401));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.userId = payload.userId;
        req.userRole = payload.userRole;
        next();
    }
    catch (error) {
        return next(new error_1.ApiError("Token de autorización inválido", 401));
    }
}
exports.authenticateHandler = authenticateHandler;
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await db_config_1.default.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.rows[0].id, userRole: user.rows[0].role }, jwtSecret, { expiresIn: "1h" });
        return res.json({ token });
    }
    catch (error) {
        console.error("Error al autenticar al usuario:", error);
        return res.status(500).json({ message: "Error al autenticar al usuario" });
    }
}
exports.login = login;
