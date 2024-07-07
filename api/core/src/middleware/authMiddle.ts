import { verifyToken } from '../helpers/JsonWebToken';
import { StatusCode } from '../helpers/controllerStatusCode';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token;
    const isValid = verifyToken(token);

    if (!isValid) {
      return res.clearCookie("access_token").clearCookie("verified_Account").status(StatusCode.UNAUTHORIZED).json({
        message: "Token inválido ou expirado"
      });
    }
    
    next()
  } catch (error) {
    res.status(401).clearCookie("access_token").clearCookie("verified_Account").json({ message: 'Unauthorized' });
  }
};