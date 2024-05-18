// src/middleware/dataValidators.ts

import { body } from "express-validator";

// Reglas de validación para la creación y actualización de datos
export const dataValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("age").isInt({ min: 1 }).withMessage("Age must be a positive integer"),
];
