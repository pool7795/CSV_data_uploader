import express, { Router } from "express";
import multer from "multer";
import { uploadCsv } from "../controllers/csvController";
import { authenticateHandler } from "../middleware/authController";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" }); // Selecciona el directorio de destino para los archivos

router.post("/upload", authenticateHandler, upload.single("file"), uploadCsv);

export default router;
