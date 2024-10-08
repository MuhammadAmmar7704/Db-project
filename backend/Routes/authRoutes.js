
import express from 'express';
const router = express.Router();

import { signup } from '../Controllers/authController.js';

router.post('/signup', signup);


export default router;