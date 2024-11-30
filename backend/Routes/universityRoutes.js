import express from "express";
import {
  addUniversity,
  deleteUniversity,
  updateUniversity,
  getAllUniversity,
} from "../Controllers/universityController.js";
import protectRoute from "../Middleware/authMiddleware.js";
import roleMiddleware from "../Middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/adduniversity",
  protectRoute,
  roleMiddleware("create_university"),
  addUniversity
);

router.post(
  "/deleteuniversity",
  protectRoute,
  roleMiddleware("remove_university"),
  deleteUniversity
);

router.post(
  "/updateuniversity",
  protectRoute,
  roleMiddleware("update_university"),
  updateUniversity
);

router.get("/getalluniversity", 
  //protectRoute, 
  getAllUniversity);

export default router;
