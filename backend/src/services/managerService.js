import * as managerRepository from '../repositories/managerRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';
import { ERRORS } from '../errors/Errors.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (email, password) => {
  const manager = await managerRepository.findByEmail(email);
  
  if (!manager) {
    throw new AppError('Credenciais inválidas', 401, ERRORS.INVALID_CREDENTIALS);
  }
  
  const isPasswordValid = await bcrypt.compare(password, manager.password);
  
  if (!isPasswordValid) {
    throw new AppError('Credenciais inválidas', 401, ERRORS.INVALID_CREDENTIALS);
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
  
  return {
    token,
    user: {
      id: manager.id,
      name: manager.name,
      email: manager.email,
      isAdmin: !!manager.isAdmin
    }
  };
};

