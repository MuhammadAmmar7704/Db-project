import express from "express";
import { addUniversity, deleteUniversity, updateUniversity, getAllUniversity } from "../Controllers/universityController.js";

const router = express.Router();

router.post('/adduniversity', addUniversity);

router.post('/deleteuniversity', deleteUniversity);

router.post('/updateuniversity', updateUniversity);

router.get('/getalluniversity', getAllUniversity);


export default router;