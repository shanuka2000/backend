// importing
import express from "express";
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware

// DB config
const connection_url =
  "mongodb+srv://shanukase:8Ejay0sufP6hTbOM@cluster0.yj3jrtg.mongodb.net/eCommercedb?retryWrites=true&w=majority";

mongoose
  .connect(connection_url)
  .then(() => console.log("DB Connected Successfully!"))
  .catch((err) => {
    console.log(err);
  });

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

// listne
app.listen(port, () => console.log(`LIstening on localhost:${port}`));
