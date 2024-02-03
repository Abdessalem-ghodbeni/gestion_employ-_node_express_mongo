import express from "express";
import {
  AddEmploye,
  RecupererLesTachesDeEmploye,
  affecterTacheToemploye,
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
router.put("/affecter/tache/:id_tache/:id_employe", affecterTacheToemploye);
router.get("/liste_tachet_affecte/:id", RecupererLesTachesDeEmploye);

export default router;
