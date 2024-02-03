import mongoose from "mongoose";

const tacheSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name of tache is required"],
    },
    description: {
      type: String,
      required: [true, "description of tache is required"],
    },
    employe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employes",
    },
  },
  { timestamps: true }
);

const tacheModel = mongoose.model("Taches", tacheSchema);
export default tacheModel;
