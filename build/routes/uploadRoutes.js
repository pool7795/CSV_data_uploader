"use strict";
// src/routes/uploadRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadController_1 = require("../controllers/uploadController");
const router = express_1.default.Router();
router.post("/upload", uploadController_1.uploadFile);
exports.default = router;
