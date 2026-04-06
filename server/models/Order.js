import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  photo: String,
  category: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [orderItemSchema],
    shippingInfo: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    paymentMethod: { type: String, default: "cash" },
    total: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
