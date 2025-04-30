import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'maisaedu-secret-key';

/*
  Middleware para verificar se o usuário está autenticado
*/
export const authRequired = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/*
  Middleware para verificar se o usuário é administrador
*/
export const adminRequired = (req, res, next) => {
  authRequired(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Admin privileges required' });
    }
  });
}; 