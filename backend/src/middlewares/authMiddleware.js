import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;


export const authRequired = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Autenticação necessária' 
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Autenticação necessária' 
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Token inválido ou expirado' 
    });
  }
};


export const adminRequired = (req, res, next) => {
  authRequired(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ 
        success: false,
        message: 'Privilégios de administrador necessários' 
      });
    }
  });
}; 