"use strict";
// src/config/swagger.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        info: {
            title: "API de Upload de CSV",
            version: "1.0.0",
            description: "Documentación de la API para subir y gestionar archivos CSV",
        },
    },
    apis: ["src/controllers/*.ts"], // Rutas a los controladores que contienen las anotaciones Swagger
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
