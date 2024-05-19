import { Request, Response } from "express";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import validator from "validator";
import pool from "../config/db.config";

const upload = multer({ dest: "uploads/" });

interface CSVRow {
  name: string;
  email: string;
  age: string;
  role: string;
  password: string;
}

interface ValidationErrorDetails {
  name?: string;
  email?: string;
  age?: string;
  role?: string;
  password?: string;
}

export const uploadCsv = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or invalid file path" });
    }

    const filePath = req.file.path;
    console.log(`Ruta del archivo: ${filePath}`);

    const successfulRecords: Array<CSVRow & { id?: number }> = [];
    const errorDetails: { row: number; details: ValidationErrorDetails }[] = [];

    try {
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (row: CSVRow) => {
            const validationErrors: ValidationErrorDetails = {};

            if (!row.name || validator.isEmpty(row.name)) {
              validationErrors.name = "El campo 'name' no puede estar vacío.";
            }
            if (!row.email || !validator.isEmail(row.email)) {
              validationErrors.email =
                "El formato del campo 'email' es inválido.";
            }
            if (!row.age || !validator.isInt(row.age, { min: 0 })) {
              validationErrors.age =
                "El campo 'age' debe ser un número positivo.";
            }
            if (!row.role || validator.isEmpty(row.role)) {
              row.role = "user"; // Asignar rol por defecto
            }
            if (!row.password || validator.isEmpty(row.password)) {
              validationErrors.password =
                "El campo 'password' no puede estar vacío.";
            }

            if (Object.keys(validationErrors).length > 0) {
              errorDetails.push({
                row: errorDetails.length + 1,
                details: validationErrors,
              });
            } else {
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
        const client = await pool.connect();

        for (const record of successfulRecords) {
          const result = await client.query(
            "INSERT INTO users (name, email, age, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [
              record.name,
              record.email,
              record.age,
              record.role,
              record.password,
            ]
          );
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
      } catch (err) {
        console.error("Error processing CSV data:", err);
        return res.status(500).json({ message: "Error processing CSV data" });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: "Unexpected error occurred" });
    }
  },
];
