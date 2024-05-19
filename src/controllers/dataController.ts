// src/controllers/dataController.ts
import { Request, Response } from "express";
import pool from "../config/db.config";
import { validationResult } from "express-validator";

// Validación de datos utilizando las reglas definidas en el middleware
export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, age, role, password } = req.body;

  try {
    await pool.query(
      "INSERT INTO users (name, email, age, role, password) VALUES ($1, $2, $3, $4, $5)",
      [name, email, age, role, password]
    );
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, email, age, role } = req.body;

  try {
    await pool.query(
      "UPDATE users SET name = $1, email = $2, age = $3, role = $4 WHERE id = $5",
      [name, email, age, role, id]
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};
