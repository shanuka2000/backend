import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  quantity: { type: Number, required: true },
  sku: { type: String, required: true },
  images: { type: Array, required: true },
});

export default mongoose.model("productDetails", ProductSchema);
