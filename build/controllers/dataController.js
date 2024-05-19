"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const express_validator_1 = require("express-validator");
// Validación de datos utilizando las reglas definidas en el middleware
const createUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, age, role, password } = req.body;
    try {
        await db_config_1.default.query("INSERT INTO users (name, email, age, role, password) VALUES ($1, $2, $3, $4, $5)", [name, email, age, role, password]);
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user" });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name, email, age, role } = req.body;
    try {
        await db_config_1.default.query("UPDATE users SET name = $1, email = $2, age = $3, role = $4 WHERE id = $5", [name, email, age, role, id]);
        return res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db_config_1.default.query("DELETE FROM users WHERE id = $1", [id]);
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Error deleting user" });
    }
};
exports.deleteUser = deleteUser;
