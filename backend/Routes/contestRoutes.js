import express from "express";
const router = express.Router();
import protectRoute from "../Middleware/authMiddleware.js";
import { addContest, countRegistration, deleteContest, getContest, getContestsByEventId, register } from "../Controllers/contestController.js";
//import roleMiddleware from "../Middleware/roleMiddleware.js";

router.post("/addcontest", 
    protectRoute, 
    addContest);
router.post("/deletecontest", protectRoute, deleteContest);
router.get("/getcontestofevent/:id", protectRoute, getContestsByEventId);
router.post("/register", protectRoute, register);
router.post("/countregistration", protectRoute, countRegistration);
router.get("/:id", protectRoute, getContest);


export default router;
