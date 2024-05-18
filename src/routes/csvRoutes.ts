import express, { Router } from "express";
import upload from "../config/multer.config";
import { uploadCsv } from "../controllers/csvController";
import { authenticateHandler } from "../middleware/authController";

const router: Router = express.Router();

router.post("/upload", authenticateHandler, upload.single("file"), uploadCsv);

export default router;
