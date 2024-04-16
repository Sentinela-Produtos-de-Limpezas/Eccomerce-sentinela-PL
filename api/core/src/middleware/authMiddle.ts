import { verifyToken } from '../helpers/JsonWebToken';
import { StatusCode } from '../helpers/controllerStatusCode';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "Formato inválido do cabeçalho de autorização. Utilize 'Bearer <token>'"
      });
    }

    const bearerToken = token.split(' ')[1]; 
    const isValid = verifyToken(bearerToken);

    if (!isValid) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "Token inválido ou expirado"
      });
    }
    
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};