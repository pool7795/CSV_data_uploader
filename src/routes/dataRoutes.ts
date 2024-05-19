import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/dataController";
import { dataValidationRules } from "../middleware/dataValidators";

const dataRouter = Router();

dataRouter.post("/", dataValidationRules, createUser);
dataRouter.put("/:id", dataValidationRules, updateUser);
dataRouter.delete("/:id", deleteUser);

export default dataRouter;
