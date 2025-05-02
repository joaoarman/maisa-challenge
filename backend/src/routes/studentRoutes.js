import express from 'express';
import * as studentController from '../controllers/studentController.js';
import { adminRequired } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/total', studentController.getTotalStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', adminRequired, studentController.updateStudent);
router.patch('/:id', adminRequired, studentController.deleteStudent);

export default router;