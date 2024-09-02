import { verifyToken } from '../helpers/JsonWebToken';
import { StatusCode } from '../helpers/controllerStatusCode';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers.authorization || "";
    const token = bearer.startsWith("Bearer ") ? bearer.substring(7) : "";

    // Verifica se o token é válido
    try {
      const decodedToken = verifyToken(token);

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Token expirado
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: "Token expirado. Por favor, faça login novamente."
        });
      } else if (error instanceof jwt.JsonWebTokenError) {
        // Token inválido
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: "Token inválido. Por favor, forneça um token válido."
        });
      } else {
        // Outros erros
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: "Erro ao verificar o token."
        });
      }
    }
  } catch (error: any) {
    // Captura e responde a erros inesperados
    res.status(StatusCode.UNAUTHORIZED).json({ message: 'Erro inesperado: ' + error.message });
  }
};
