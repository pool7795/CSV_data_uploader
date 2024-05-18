import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";
import pool from "../config/db.config";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}

const jwtSecret: string = process.env["JWT_SECRET_KEY"] || "ultra-secret";

export async function authenticateHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError("No autorizado", 401));
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
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM data WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id, userRole: user.rows[0].role },
      jwtSecret,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  } catch (error) {
    console.error("Error al autenticar al usuario:", error);
    return res.status(500).json({ message: "Error al autenticar al usuario" });
  }
}
