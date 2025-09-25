import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/users/   -> Admin only, get all users
router.get("/", protect, admin, getAllUsers);


export default router;
