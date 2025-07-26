import express from "express";
import {
  getAllUsers,
  getAllOrders,
  updateProductByAdmin,
  deleteProductByAdmin,
  getDashboardSummary,
} from "../controllers/adminController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only routes
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/orders", protect, isAdmin, getAllOrders);
router.put("/products/:id", protect, isAdmin, updateProductByAdmin);
router.delete("/products/:id", protect, isAdmin, deleteProductByAdmin);
router.get("/summary", protect, isAdmin, getDashboardSummary);

export default router;
