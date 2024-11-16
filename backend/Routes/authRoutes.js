import express from "express";
const router = express.Router();

import {
  deleteUser,
  login,
  signup,
  logout,
  getCurrentUser,
} from "../Controllers/authController.js";
import protectRoute from "../Middleware/authMiddleware.js";
import roleMiddleware from "../Middleware/roleMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.post("/removeuser", protectRoute, roleMiddleware("remove_user"), deleteUser);
router.get("/me", protectRoute, getCurrentUser);

export default router;
