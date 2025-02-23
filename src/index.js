//require("dotenv").config({path:"./env"});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    app.on("error", (error) => {
      //this one is when mongo db connect but due to some reason express is not coonect for this we sue event of app i.e on
      console.log("ERROR:", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!", err);
  });

/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("error:", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`app is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR:", error);
    throw err;
  }
})();
*/
