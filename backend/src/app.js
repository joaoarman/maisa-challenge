import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
import exceptionFilter from './middlewares/exceptionFilter.js';
import { authRequired } from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();
const port = process.env.API_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.use('/api/v1/managers', managerRoutes);

// Protected Routes
app.use('/api/v1/students', authRequired, studentRoutes);

// Error handling middleware
app.use(exceptionFilter);

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
}); 