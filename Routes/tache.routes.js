import express from "express";
import {
  ajouterTache,
  deletetache,
  recupereAllTask,
  recupererTachesById,
} from "../Controllers/taches.controller.js";

const router = express.Router();

router.post("/ajouter/tache", ajouterTache);
router.get("/get/task/:id", recupererTachesById);
router.get("/get/all/task", recupereAllTask);
router.delete("/delete/tache/:id", deletetache);

export default router;
