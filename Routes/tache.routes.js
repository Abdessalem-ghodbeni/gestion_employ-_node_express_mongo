import express from "express";
import {
  ajouterTache,
  deletetache,
  modifierTache,
  recupereAllTask,
  recupererTachesById,
} from "../Controllers/taches.controller.js";

const router = express.Router();

router.post("/ajouter/tache", ajouterTache);
router.get("/get/task/:id", recupererTachesById);
router.get("/get/all/task", recupereAllTask);
router.delete("/delete/tache/:id", deletetache);
router.put("/update/:id", modifierTache);

export default router;
