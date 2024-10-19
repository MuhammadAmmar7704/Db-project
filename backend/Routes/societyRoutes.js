import express from "express";
import {
  addSociety,
  deleteSociety,
  updateSociety,
  getAllSociety,
} from "../Controllers/societyController.js";
import protectRoute from "../Middleware/authMiddleware.js";
import checkRole from "../Middleware/rolesMiddleware.js";

const router = express.Router();

router.post(
  "/addsociety",
  protectRoute,
  checkRole("University_Head"),
  addSociety
);

router.post(
  "/deletesociety",
  protectRoute,
  checkRole("University_Head"),
  deleteSociety
);

router.post(
  "/updatesociety",
  protectRoute,
  checkRole("University_Head"),
  updateSociety
);

router.get(
  "/getallsociety",
  protectRoute,
  checkRole("University_Head"),
  getAllSociety
);

export default router;
