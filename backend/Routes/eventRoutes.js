import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvent,
  updateEvent,
} from "../Controllers/eventController.js";
import protectRoute from "../Middleware/authMiddleware.js";
import checkRole from "../Middleware/rolesMiddleware.js";
const router = express.Router();

router.post(
  "/addevent",
  protectRoute,
  checkRole("University_Head") || checkRole("Society_Head"),
  addEvent
);

router.post(
  "/deleteevent",
  protectRoute,
  checkRole("University_Head") || checkRole("Society_Head"),
  addEvent,
  deleteEvent
);

router.post(
  "/updateevent",
  protectRoute,
  checkRole("University_Head") || checkRole("Society_Head"),
  addEvent,
  updateEvent
);

router.get(
  "/getallevent",
  protectRoute,
  checkRole("University_Head") || checkRole("Society_Head"),
  addEvent,
  getAllEvent
);

export default router;
