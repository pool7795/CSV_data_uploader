import express from "express";
import { uploadCsv } from "../controllers/csvController";

const router = express.Router();

router.post("/upload", uploadCsv);

export default router;
