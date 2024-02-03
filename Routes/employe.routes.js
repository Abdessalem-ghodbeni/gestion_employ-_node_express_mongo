import express from "express";
import {
  AddEmploye,
  deleteEmployeController,
  getAllEmploye,
  getEmployeById,
  updateEmployeController,
} from "../Controllers/employe.controller.js";

const router = express.Router();

router.post("/add/employe", AddEmploye);
router.delete("/delete/employe/:id", deleteEmployeController);
router.get("/retrive/:id", getEmployeById);
router.get("/retrive", getAllEmploye);
router.put("/update/:id", updateEmployeController);

export default router;
