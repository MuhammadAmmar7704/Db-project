import express from "express";
const router = express.Router();

import {
  deleteUser,
  login,
  signup,
  logout,
  getCurrentUser,
  getAllUsers,
} from "../Controllers/authController.js";
import protectRoute from "../Middleware/authMiddleware.js";
import roleMiddleware from "../Middleware/roleMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.post("/removeuser", protectRoute, deleteUser);
//roleMiddleware("remove_user"), 
router.get("/me", protectRoute, getCurrentUser);
router.get("/all", protectRoute,  getAllUsers);
//roleMiddleware('view_users'),
export default router;
