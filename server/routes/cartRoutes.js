import express from "express";
import {
  getCart,
  updateCart,
  checkout,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.put("/update", protect, updateCart);
router.post("/checkout", protect, checkout);

export default router;
