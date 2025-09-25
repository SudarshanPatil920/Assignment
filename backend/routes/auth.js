import express from "express";
import { registerUser, authUser, logoutUser } from "../controllers/authController.js";
import { getMe } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validateLogin } from "../middlewares/validateMiddleware.js";
import { validateRegister } from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.post("/register",validateRegister, registerUser);
router.post("/login",validateLogin, authUser);
router.post("/logout", logoutUser);

export default router;
