import * as managerService from '../services/managerService.js';
import loginModel  from '../models/Manager.js';

export const login = async (req, res, next) => {
  try {
    const validatedData = loginModel.parse(req.body);
    
    const result = await managerService.login(
      validatedData.email,
      validatedData.password
    );
    
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    next(error);
  }
};
