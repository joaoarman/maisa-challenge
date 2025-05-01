import express from 'express';
import * as managerController from '../controllers/managerController.js';

const router = express.Router();

router.post('/login', managerController.login);

export default router; 