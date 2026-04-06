import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    email: String,
    phone: String,
    address: String,
    image: String,
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
