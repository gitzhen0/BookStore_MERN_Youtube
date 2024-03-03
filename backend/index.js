import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to mern");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    //put this in mongoose, only run app if DB connection success
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
