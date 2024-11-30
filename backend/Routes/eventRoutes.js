import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvent,
  updateEvent,
  getEventbyId,
  getEventOfUni
} from "../Controllers/eventController.js";
import roleMiddleware from "../Middleware/roleMiddleware.js";
import protectRoute from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/addevent",
  protectRoute,
  roleMiddleware("create_event"),
  addEvent
);

router.post(
  "/deleteevent",
  protectRoute,
  roleMiddleware("remove_event"),
  deleteEvent
);

router.post(
  "/updateevent",
  protectRoute,
  roleMiddleware("update_event"),
  updateEvent
);

router.get("/getallevent", protectRoute, getAllEvent);


router.get("/getevent/:id", protectRoute, getEventbyId);

router.get("/getuniversityevents/:university_id", getEventOfUni);

export default router;
