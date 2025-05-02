import db from '../config/connection.js';
import { AppError } from '../errors/AppError.js';
import { ERRORS } from '../errors/Errors.js';

export const findByEmail = async (email) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        name,
        email,
        password,
        isAdmin
      FROM manager 
      WHERE 
        email = ? 
        AND isActive = 1`, 
      [email]
    );
    
    return rows[0];
  } catch (error) {
    throw new AppError('Erro ao buscar manager', 500, ERRORS.INTERNAL_SERVER_ERROR);
  }
};
