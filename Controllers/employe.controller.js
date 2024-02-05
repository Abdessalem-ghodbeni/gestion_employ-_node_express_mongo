import employeModel from "../models/employe.model.js";
import { ObjectId } from "mongodb";
import tacheModel from "../models/taches.model.js";
export const AddEmploye = async (req, res) => {
  try {
    const { name, prenom, age, email } = req.body;
    if (!name || !age || !email || !prenom) {
      return res.status(500).send({
        succes: false,
        message: "merci de verifier les champs",
      });
    }

    const emplye = await employeModel.findOne({ email });
    if (emplye) {
      return res.status(500).send({
        succes: false,
        message: "emplye existe avec cet e_mail",
      });
    }
    const employe = await employeModel.create({
      name,
      age,
      email,
      prenom,
    });
    res.status(201).send({
      succes: true,
      message: "emplyee ajouté avec succes ",
      employe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "quelque chose mal passé",
      error,
    });
  }
};

export const deleteEmployeController = async (req, res) => {
  try {
    const employeId = req.params.id;
    if (!ObjectId.isValid(employeId)) {
      return res.status(500).send({
        succes: false,
        message: "invalid format d'id",
      });
    }
    const employe = await employeModel.findById(employeId);
    if (!employe) {
      return res.status(404).send({
        succes: false,
        message: "employe introuvable avec cet id",
      });
    }

    const employeDeleted = await employeModel.deleteOne({ _id: employeId });
    if (employeDeleted.deletedCount === 1) {
      res.status(200).send({
        succes: true,
        message: "employe successfully deleted",
        employeDeleted,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "quelque chose mal passé",
      error,
    });
  }
};

export const getEmployeById = async (req, res) => {
  try {
    const employeId = req.params.id;
    if (!ObjectId.isValid(employeId)) {
      return res.status(500).send({
        succes: false,
        message: "id est non valid",
      });
    }
    const employee = await employeModel.findById({ _id: employeId });
    if (!employee) {
      return res.status(404).send({
        succes: false,
        message: "employe non trouvable avec cet id ",
      });
    }
    res.status(200).send({
      succes: true,
      message: "employe geted successfully",
      employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "erreur lors de recuperation de l'employe",
    });
  }
};

export const getAllEmploye = async (req, res) => {
  try {
    // avec find seulement il nous renvoie la liste contient seulement les id tandit que j'utilise populate elle renvoie l'objet avec toutes les informations
    // const employes = await employeModel.find();
    const employes = await employeModel.find().populate("taches");
    if (employes.length === 0) {
      return res.status(200).send({
        succes: true,
        message: "liste des employeees est vide ",
        employes,
      });
    }
    res.status(200).send({
      succes: true,
      message: "employee recuperer successfully",
      employes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "une chose mal passé lors de recuperation de tous les employe",
      error,
    });
  }
};

// export const updateEmployeController = async (req, res) => {
//   try {
//     const employeId = req.params.id;
//     const { name, prenom, email, age } = req.body;
//     if (!ObjectId.isValid(employeId)) {
//       return res.status(500).send({
//         succes: false,
//         message: "id non valid",
//       });
//     }

//     const employe = await employeModel.findById({ _id: employeId });
//     if (!employe) {
//       return res.status(500).send({
//         succes: false,
//         message: "employe non trouvable",
//       });
//     }
//     if (name) employe.name = name;
//     if (prenom) employe.prenom = prenom;
//     if (email) employe.email = email;
//     if (age) employe.age = age;
//     await employe.save();
//     res.status(200).send({
//       succes: true,
//       message: "employe successfully updated",
//       employe,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       succes: false,
//       message: "quelque chose mal passé lors d'udpate employee",
//     });
//   }
// };
export const updateEmployeController = async (req, res) => {
  try {
    const employeId = req.params.id;
    const { name, prenom, email, age } = req.body;

    // Vérifiez si l'ID est un ID MongoDB valide
    if (!ObjectId.isValid(employeId)) {
      return res.status(400).send({
        success: false,
        message: "ID de l'employé invalide",
      });
    }

    // Utilisez findOneAndUpdate pour mettre à jour l'employé
    const updatedEmploye = await employeModel.findOneAndUpdate(
      { _id: employeId },
      { $set: { name, prenom, email, age } },
      { new: true }
    );

    if (!updatedEmploye) {
      return res.status(404).send({
        success: false,
        message: "Employé non trouvé avec cet ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Employé mis à jour avec succès",
      employe: updatedEmploye,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:
        "Quelque chose s'est mal passé lors de la mise à jour de l'employé",
      error,
    });
  }
};

export const affecterTacheToemploye = async (req, res) => {
  try {
    // req.params.id_employe;req.params.id_tache; doivent etre meme ecriture dans la route
    const id_tache = req.params.id_tache;
    const id_employe = req.params.id_employe;

    if (!ObjectId.isValid(id_tache)) {
      return res.status(500).send({
        succes: false,
        message: "id tache est non valid ",
      });
    }
    if (!ObjectId.isValid(id_employe)) {
      return res.status(500).send({
        succes: false,
        message: "id employe est non valide",
      });
    }

    const employe = await employeModel.findById({ _id: id_employe });
    const tache = await tacheModel.findById({ _id: id_tache });

    if (!employe) {
      return res.status(404).send({
        succes: false,
        message: "employe est non trouvable avec cet id ",
      });
    }

    if (!tache) {
      return res.status(404).send({
        succes: false,
        message: "tache est introuvable avec cet id ",
      });
    }

    await employe.taches.push(tache);
    await employe.save();

    res.status(200).send({
      succes: true,
      message: "employe successfuly affected to task",
      employe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message:
        "Erreur s'est produit lors d'affectation d'un employe a une taches",
    });
  }
};

export const RecupererLesTachesDeEmploye = async (req, res) => {
  try {
    const id_employe = req.params.id;
    if (!ObjectId.isValid(id_employe)) {
      return res.status(500).send({
        succes: false,
        message: "invalid id ",
      });
    }
    const employe = await employeModel.findById(id_employe);
    if (!employe) {
      return res.status(404).send({
        succes: false,
        message: "employe non trouvable",
      });
    }
    if (employe.taches.length === 0) {
      return res.status(200).send({
        succes: true,
        message: "encore...accune tache affectée pour le moments",
      });
    }
    const liste_des_taches = [];
    for (let i = 0; i < employe.taches.length; i++) {
      const tacheAffectedDetails = await tacheModel.findById(employe.taches[i]);
      liste_des_taches.push(tacheAffectedDetails);
    }
    res.status(200).send({
      succes: true,
      message: "ceci la liste des taches affectées a cet employé",
      liste_des_taches,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message:
        "une chose mal passé lors de recuperation de liste des taches de cet employé",
    });
  }
};
