import exrpress from "express";
import dotenv from "dotenv";
import Color from "colors";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./config/db.js";
import employeRouter from "./Routes/employe.routes.js";

//initialisation d'expreess app
const application = exrpress();
//configuration dotenv
dotenv.config();

application.use(exrpress.json());
application.use(morgan("dev"));
application.use(cors());
const Port = process.env.PORT || 5080;
//connect data base
connectDb();

application.use("/employe", employeRouter);

application.listen(Port, () => {
  console.log(
    `server runing in port ${process.env.PORT} on ${process.env.MODE_DEV}`
      .bgMagenta.yellow
  );
});
