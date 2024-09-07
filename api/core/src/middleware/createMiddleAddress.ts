import { Request, Response, NextFunction } from 'express';
import { addressSchema } from '../validations/joi/addressSchema'; // Ajuste o caminho conforme necessário

export const createMiddleAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const { error } = addressSchema.validate(body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      message: 'Erro interno no servidor'
    });
  }
};
