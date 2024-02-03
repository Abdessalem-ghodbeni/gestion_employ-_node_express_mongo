import mongoose from "mongoose";

const employeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required "],
    },
    age: {
      type: Number,
      required: [true, "age is required"],
    },
    prenom: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true, //add createdAt and updatedAt fields automatically
  }
);
const employeModel = mongoose.model("Employes", employeSchema);
export default employeModel;
