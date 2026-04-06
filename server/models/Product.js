import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    photo: { type: String },
    suppliers: { type: String },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
