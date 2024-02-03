import express from "express";
import { ajouterTache } from "../Controllers/taches.controller.js";

const router = express.Router();

router.post("/ajouter/tache", ajouterTache);

export default router;
