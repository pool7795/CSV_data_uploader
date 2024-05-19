"use strict";
// src/middleware/dataValidators.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataValidationRules = void 0;
const express_validator_1 = require("express-validator");
// Reglas de validación para la creación y actualización de datos
exports.dataValidationRules = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("age").isInt({ min: 1 }).withMessage("Age must be a positive integer"),
];
