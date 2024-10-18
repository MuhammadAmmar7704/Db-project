import express from "express";
import { addEvent, deleteEvent, getAllEvent, updateEvent } from "../Controllers/eventController.js";

const router = express.Router();

router.post('/addevent', addEvent);

router.post('/deleteevent', deleteEvent);

router.post('/updateevent', updateEvent);

router.get('/getallevent', getAllEvent);


export default router;