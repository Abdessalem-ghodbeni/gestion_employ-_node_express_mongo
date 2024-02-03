import tacheModel from "../models/taches.model.js";
import ObjectId from "mongodb";

export const ajouterTache = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(500).send({
        succes: false,
        message: "merci de verifier les champs",
      });
    }

    const newTache = await tacheModel.create({
      name,
      description,
    });

    res.status(201).send({
      succes: true,
      message: "tache added sucssfully",
      newTache,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "somthing was warrning in added tache",
    });
  }
};
