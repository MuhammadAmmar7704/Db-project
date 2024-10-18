import express from "express";
const router = express.Router();

import {
  deleteUser,
  login,
  signup,
  logout,
} from "../Controllers/authController.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", login);
router.post("/removeuser", deleteUser);

export default router;
