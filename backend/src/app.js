import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';
import exceptionFilter from './middlewares/exceptionFilter.js';

dotenv.config();
const app = express();
const port = process.env.API_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Protected Routes
app.use('/api/v1/students', studentRoutes);

// Error handling middleware
app.use(exceptionFilter);

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
}); 