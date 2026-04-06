import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./models/Product.js";
import Customer from "./models/Customer.js";
import Order from "./models/Order.js";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

mongoose.connect(process.env.MONGODB_URI);

const importData = async () => {
  try {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data/products.json"), "utf-8"),
    );
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products have been uploaded!");

    const customers = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data/customers.json"), "utf-8"),
    );
    await Customer.deleteMany();
    await Customer.insertMany(customers);
    console.log("Customers loaded!");

    const orders = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data/orders.json"), "utf-8"),
    );
    await Order.deleteMany();
    await Order.insertMany(orders);
    console.log("Orders have been loaded!");
    console.log("ALL DATA HAS BEEN SUCCESSFULLY TRANSFERRED!");
    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

importData();
