// src/routes/authRoutes.ts
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../middleware/error";
import { login } from "../middleware/authController";

const router = express.Router();
const jwtSecret = process.env["JWT_SECRET_KEY"] || "ultra-secret"; // Se ajustó aquí

router.post("/login", login);

router.use((req: Request, res: Response, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(
      new ApiError("No se proporcionó un token de autorización", 401)
    );
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      userId: number;
      userRole: string;
      iat: number;
      exp: number;
    };

    req.userId = payload.userId;
    req.userRole = payload.userRole;
    next();
  } catch (error: any) {
    return next(new ApiError("Token de autorización inválido", 401));
  }
});

export default router;
