// importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import upload from "./middleware/multerMiddleware.js";
import Product from "./models/Product.js";

// app config
const app = express();
const port = process.env.PORT || 9000;
app.use("/images", express.static("images"));
app.use(cors());

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

// Create New Product
app.post("/new", upload.array("images"), async (req, res) => {
  const productDetails = req.body;
  const productImages = req.files;

  const newProduct = new Product({
    productName: productDetails.productName,
    productDescription: productDetails.productDescription,
    quantity: productDetails.quantity,
    sku: productDetails.sku,
    images: productImages.map((file) => file.path),
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find All Products
app.get("/all", async (req, res) => {
  const products = await Product.find();

  const convertedProducts = JSON.parse(
    JSON.stringify(products).replace(/\\/g, "/")
  );
  res.status(200).send(convertedProducts);
});

// Health Check Endpoint
app.get("/", (req, res) => res.status(200).send("hello world"));

// listne
app.listen(port, () => console.log(`LIstening on localhost:${port}`));
