import express from "express";
const router = express.Router();
import protectRoute from "../Middleware/authMiddleware.js";
import { addContest, deleteContest, getContestsByEventId, register } from "../Controllers/contestController.js";
//import roleMiddleware from "../Middleware/roleMiddleware.js";

router.post("/addcontest", protectRoute, addContest);
router.post("/deletecontest", protectRoute, deleteContest);
router.post("/getcontestofevent/:id", protectRoute, getContestsByEventId);
router.post("/register", protectRoute, register);


export default router;
