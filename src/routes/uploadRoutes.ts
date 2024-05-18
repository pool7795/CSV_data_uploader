// src/routes/uploadRoutes.ts

import express, { Router } from "express";
import { uploadFile } from "../controllers/uploadController";

const router: Router = express.Router();

router.post("/upload", uploadFile);

export default router;
