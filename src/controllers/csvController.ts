import { Request, Response } from "express";
import pool from "../config/db.config";
import csvParser from "csv-parser";
import fs from "fs";
import { validationResult } from "express-validator";

export const uploadCsv = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validación de datos del cuerpo de la solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const results: any[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (data: any) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            await pool.query(
              "INSERT INTO data (name, email, age) VALUES ($1, $2, $3)",
              [row.name, row.email, row.age]
            );
          }
          if (req.file) {
            fs.unlinkSync(req.file.path); // Eliminar el archivo después de procesarlo
          }
          return res
            .status(200)
            .json({ message: "File uploaded and data inserted" });
        } catch (error) {
          console.error("Error inserting data:", error);
          return res.status(500).json({ message: "Error inserting data" });
        }
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        return res.status(500).json({ message: "Error reading CSV file" });
      });
  } catch (error) {
    console.error("Error uploading CSV:", error);
    return res.status(500).json({ message: "Error uploading CSV" });
  }
  // Agregar un return al final para satisfacer TypeScript
  return res.status(500).json({ message: "Error uploading CSV" });
};
