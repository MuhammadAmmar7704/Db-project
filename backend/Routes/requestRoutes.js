
import express from "express";
import {addRequest} from "../Controllers/requestControllers.js"

// reject this for now

const router = express.Router();

router.post('/addrequest', addRequest);

export default router;