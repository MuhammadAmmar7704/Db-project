import express from "express";
import { addSociety, deleteSociety, updateSociety, getAllSociety } from "../Controllers/societyController.js";

const router = express.Router();

router.post('/addsociety', addSociety);

router.post('/deletesociety', deleteSociety);

router.post('/updatesociety', updateSociety);

router.get('/getallsociety', getAllSociety);


export default router;