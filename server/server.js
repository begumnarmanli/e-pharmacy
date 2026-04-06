import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-pharmacy-chi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation: Unauthorized origin"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/nearest_pharmacies", (req, res) => {
  const filePath = path.join(__dirname, "data", "nearest_pharmacies.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("File reading error:", err);
      return res
        .status(500)
        .json({ message: "The JSON file was not found or could not be read." });
    }
    res.json(JSON.parse(data));
  });
});

app.get("/api/reviews", (req, res) => {
  const filePath = path.join(__dirname, "data", "reviews.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Reviews could not be loaded" });
    }
    res.json(JSON.parse(data));
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Pharmacy Server is running!",
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, _next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
