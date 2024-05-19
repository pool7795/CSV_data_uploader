"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCsv = void 0;
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const validator_1 = __importDefault(require("validator"));
const db_config_1 = __importDefault(require("../config/db.config"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.uploadCsv = [
    upload.single("file"),
    async (req, res) => {
        if (!req.file) {
            return res
                .status(400)
                .json({ message: "No file uploaded or invalid file path" });
        }
        const filePath = req.file.path;
        console.log(`Ruta del archivo: ${filePath}`);
        const successfulRecords = [];
        const errorDetails = [];
        try {
            await new Promise((resolve, reject) => {
                fs_1.default.createReadStream(filePath)
                    .pipe((0, csv_parser_1.default)())
                    .on("data", (row) => {
                    const validationErrors = {};
                    if (!row.name || validator_1.default.isEmpty(row.name)) {
                        validationErrors.name = "El campo 'name' no puede estar vacío.";
                    }
                    if (!row.email || !validator_1.default.isEmail(row.email)) {
                        validationErrors.email =
                            "El formato del campo 'email' es inválido.";
                    }
                    if (!row.age || !validator_1.default.isInt(row.age, { min: 0 })) {
                        validationErrors.age =
                            "El campo 'age' debe ser un número positivo.";
                    }
                    if (!row.role || validator_1.default.isEmpty(row.role)) {
                        row.role = "user"; // Asignar rol por defecto
                    }
                    if (!row.password || validator_1.default.isEmpty(row.password)) {
                        validationErrors.password =
                            "El campo 'password' no puede estar vacío.";
                    }
                    if (Object.keys(validationErrors).length > 0) {
                        errorDetails.push({
                            row: errorDetails.length + 1,
                            details: validationErrors,
                        });
                    }
                    else {
                        successfulRecords.push(row);
                    }
                })
                    .on("end", () => {
                    console.log("Iniciando procesamiento del archivo...");
                    resolve();
                })
                    .on("error", (err) => {
                    console.error("Error reading CSV file:", err);
                    reject(err);
                });
            });
            try {
                const client = await db_config_1.default.connect();
                for (const record of successfulRecords) {
                    const result = await client.query("INSERT INTO users (name, email, age, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING id", [
                        record.name,
                        record.email,
                        record.age,
                        record.role,
                        record.password,
                    ]);
                    record.id = result.rows[0].id;
                }
                client.release();
                console.log("Procesamiento del archivo completado.");
                return res.status(200).json({
                    ok: true,
                    data: {
                        success: successfulRecords,
                        errors: errorDetails,
                    },
                });
            }
            catch (err) {
                console.error("Error processing CSV data:", err);
                return res.status(500).json({ message: "Error processing CSV data" });
            }
        }
        catch (error) {
            console.error("Unexpected error:", error);
            return res.status(500).json({ message: "Unexpected error occurred" });
        }
    },
];
