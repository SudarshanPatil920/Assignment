import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import {
  getAllUsers,
  getAdminTasks,
  deleteAdminTask,
  getAdminStats,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/tasks", protect, adminOnly, getAdminTasks);       // ← tasks route
router.delete("/tasks/:id", protect, adminOnly, deleteAdminTask); // ← delete route
router.get("/stats", protect, adminOnly, getAdminStats);       // ← stats route

export default router;
