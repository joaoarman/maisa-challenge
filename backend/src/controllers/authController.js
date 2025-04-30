import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { loginModel } from '../models/Manager.js';

const JWT_SECRET = process.env.JWT_SECRET || 'maisaedu-secret-key';

export const login = async (req, res, next) => {
  try {
    
    const validatedData = loginModel.parse(req.body);
    
    const manager = await db.Manager.findOne({
      where: { 
        email: validatedData.email,
        isActive: 1
      }
    });
    
    if (!manager) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(
      validatedData.password, 
      manager.password
    );
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { 
        id: manager.id, 
        email: manager.email,
        isAdmin: manager.isAdmin
      }, 
      JWT_SECRET, 
      { expiresIn: '8h' }
    );
    
    return res.status(200).json({
      token,
      user: {
        id: manager.id,
        name: manager.name,
        email: manager.email,
        isAdmin: !!manager.isAdmin
      }
    });
    
  } catch (error) {
    next(error);
  }
};