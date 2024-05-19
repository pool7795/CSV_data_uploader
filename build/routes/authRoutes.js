"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../middleware/error");
const authController_1 = require("../middleware/authController");
const router = express_1.default.Router();
const jwtSecret = process.env["JWT_SECRET_KEY"] || "ultra-secret"; // Se ajustó aquí
router.post("/login", authController_1.login);
router.use((req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new error_1.ApiError("No se proporcionó un token de autorización", 401));
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
});
exports.default = router;
