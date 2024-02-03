import tacheModel from "../models/taches.model.js";
import { ObjectId } from "mongodb";

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

export const recupererTachesById = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!ObjectId.isValid(taskId)) {
      return res.status(500).send({
        succes: false,
        message: "id est non valid ",
      });
    }

    const taskedById = await tacheModel.findById(taskId);
    if (!taskedById) {
      return res.status(404).send({
        succes: false,
        message: `tache avec id = ${taskId} est introuvable`,
      });
    }

    res.status(200).send({
      succes: true,
      message: "tache recuperer avec succes",
      taskedById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "une chose mal passé lors de recuperation d'une tache ",
    });
  }
};

export const recupereAllTask = async (req, res) => {
  try {
    const ListeOfTasck = await tacheModel.find();
    if (ListeOfTasck.length === 0) {
      return res.status(200).send({
        succes: true,
        message: "accun tache trouvé,liste vide ",
        ListeOfTasck,
      });
    }
    res.status(200).send({
      succes: true,
      message: "liste recupeérée avec succes",
      ListeOfTasck,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "somthing was warning",
    });
  }
};

export const deletetache = async (req, res) => {
  try {
    const tacheId = req.params.id;
    if (!ObjectId.isValid(tacheId)) {
      return res.status(500).send({
        succes: 500,
        message: "id is not valid ",
      });
    }
    const tacheDeleted = await tacheModel.findById(tacheId);
    if (!tacheDeleted) {
      return res.status(404).send({
        succes: false,
        message: "tache non trouvable avec cet id ",
      });
    }
    const tacheIsDeleted = await tacheModel.deleteOne({ _id: tacheId });
    if (tacheIsDeleted.deletedCount === 1) {
      res.status(200).send({
        succes: true,
        message: "tache deleted successfully",
        tacheIsDeleted,
      });
    }
  } catch (error) {
    console.log(error),
      res.status(500).send({
        succes: false,
        message: "une chose mal passé lors de supression de tache",
        error,
      });
  }
};
