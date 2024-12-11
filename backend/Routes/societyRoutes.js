import express from "express";
import {
  addSociety,
  deleteSociety,
  updateSociety,
  getAllSociety,
  getSocietybyId,
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
  roleMiddleware("update_society"),
  updateSociety
);

router.get("/getallsociety", protectRoute, getAllSociety);

router.get("/getsociety/:id", protectRoute, getSocietybyId);

export default router;
