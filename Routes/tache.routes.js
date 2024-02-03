import express from "express";
import {
  ajouterTache,
  recupereAllTask,
  recupererTachesById,
} from "../Controllers/taches.controller.js";

const router = express.Router();

router.post("/ajouter/tache", ajouterTache);
router.get("/get/task/:id", recupererTachesById);
router.get("/get/all/task", recupereAllTask);

export default router;
