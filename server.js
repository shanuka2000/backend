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

// Delete one product
app.delete("/remove/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update product
app.put("/update/:id", async (req, res) => {
  // Need implementation
});

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

// Get one product
app.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const convertedProduct = JSON.parse(
      JSON.stringify(product).replace(/\\/g, "/")
    );

    res.status(200).send(convertedProduct);
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
