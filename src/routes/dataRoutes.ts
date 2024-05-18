import { Router } from "express";
import {
  createData,
  updateData,
  deleteData,
} from "../controllers/dataController";
import { dataValidationRules } from "../middleware/dataValidators";

const dataRouter = Router();

dataRouter.post("/create", dataValidationRules, createData);
dataRouter.put("/:id", dataValidationRules, updateData);
dataRouter.delete("/:id", deleteData);

export default dataRouter;
