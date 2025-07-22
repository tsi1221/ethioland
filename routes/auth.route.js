import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { getMe } from '../controllers/auth.controller.js'; 


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);

export default router;