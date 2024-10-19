import express from "express";
import {
  addSociety,
  deleteSociety,
  updateSociety,
  getAllSociety,
} from "../Controllers/societyController.js";
import protectRoute from "../Middleware/authMiddleware.js";
import roleMiddleware from "../Middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/addsociety",
  protectRoute,
  roleMiddleware("create_society"),
  addSociety
);

router.post(
  "/deletesociety",
  protectRoute,
  roleMiddleware("remove_society"),
  deleteSociety
);

router.post(
  "/updatesociety",
  protectRoute,
  roleMiddleware("update_society_society"),
  updateSociety
);

router.get("/getallsociety", protectRoute, getAllSociety);

export default router;
