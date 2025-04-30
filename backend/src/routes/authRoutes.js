import express from 'express';
import * as authController from '../controllers/authController.js';
import { authRequired, adminRequired } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);

export default router; 