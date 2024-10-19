import express from "express";
import {
  addUniversity,
  deleteUniversity,
  updateUniversity,
  getAllUniversity,
} from "../Controllers/universityController.js";
import protectRoute from "../Middleware/authMiddleware.js";
import checkRole from "../Middleware/rolesMiddleware.js";

const router = express.Router();

router.post(
  "/adduniversity",
  protectRoute,
  checkRole("Super_Admin"),
  addUniversity
);

router.post(
  "/deleteuniversity",
  protectRoute,
  checkRole("Super_Admin"),
  deleteUniversity
);
router.post(
  "/updateuniversity",
  protectRoute,
  checkRole("Super_Admin"),
  updateUniversity
);

router.get(
  "/getalluniversity",
  protectRoute,
  checkRole("Super_Admin"),
  getAllUniversity
);

export default router;
