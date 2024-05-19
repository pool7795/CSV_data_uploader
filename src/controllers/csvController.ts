// src/controllers/csvController.ts
import { Request, Response } from "express";
import pool from "../config/db.config";
import csvParser from "csv-parser";
import fs from "fs";
import { validationResult } from "express-validator";
import { User, validateUser } from "../models/user.model";

export const uploadCsv = (req: Request, res: Response): Response | void => {
  // Verificar si se ha subido un archivo y si su ruta es válida
  if (!req.file || !req.file.path) {
    return res
      .status(400)
      .json({ message: "No file uploaded or invalid file path" });
  }

  // Verificar el tamaño del archivo
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
  if (req.file.size > MAX_FILE_SIZE_BYTES) {
    fs.unlinkSync(req.file.path); // Eliminar el archivo si es demasiado grande
    return res.status(400).json({ message: "File size exceeds maximum limit" });
  }

  // Verificar la validación de datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const results: User[] = [];
  const errorDetails: any[] = [];

  console.log("Iniciando procesamiento del archivo...");

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (data: any) => {
      const user: User = {
        name: data.name,
        email: data.email,
        age: data.age ? parseInt(data.age, 10) : undefined,
        role: data.role ? data.role : "user",
      };

      if (validateUser(user)) {
        results.push(user);
      } else {
        console.log("Datos inválidos en el archivo:", data);
        errorDetails.push({ user, error: "Invalid data" });
      }
    })
    .on("end", async () => {
      console.log("Procesamiento del archivo completado.");

      try {
        for (const user of results) {
          await pool.query(
            "INSERT INTO users (name, email, age, role) VALUES ($1, $2, $3, $4)",
            [user.name, user.email, user.age, user.role]
          );
        }
        if (req.file) {
          fs.unlinkSync(req.file.path); // Eliminar el archivo después de procesarlo
        }
        return res.status(200).json({
          message: "File uploaded and data inserted",
          successfulRecords: results.length,
          errorDetails,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ message: "Error inserting data" });
      }
    })
    .on("error", (error) => {
      console.error("Error durante el procesamiento del archivo:", error);
      return res.status(500).json({ message: "Error reading CSV file" });
    });
};
