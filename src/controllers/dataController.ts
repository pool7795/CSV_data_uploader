// src/controllers/dataController.ts

import { Request, Response } from "express";
import pool from "../config/db.config";
import { validationResult } from "express-validator";
// import { dataValidationRules } from "../middleware/dataValidators";

// Validación de datos utilizando las reglas definidas en el middleware
export const createData = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, age, password } = req.body;

  try {
    await pool.query(
      "INSERT INTO data (name, email, age, password) VALUES ($1, $2, $3, $4)",
      [name, email, age, password]
    );
    return res.status(201).json({ message: "Data created successfully" });
  } catch (error) {
    console.error("Error creating data:", error);
    return res.status(500).json({ message: "Error creating data" });
  }
};

export const updateData = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    await pool.query(
      "UPDATE data SET name = $1, email = $2, age = $3 WHERE id = $4",
      [name, email, age, id]
    );
    return res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    return res.status(500).json({ message: "Error updating data" });
  }
};

export const deleteData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM data WHERE id = $1", [id]);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({ message: "Error deleting data" });
  }
};
