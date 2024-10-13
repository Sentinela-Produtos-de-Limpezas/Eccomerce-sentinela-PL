import { Request, Response, NextFunction } from 'express';
import { orderSchema } from '../validations/joi/orderSchema'; // Ajuste o caminho conforme necessário

export const createMiddleOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const { error } = orderSchema.validate(body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message, // Mensagem de erro personalizada
      });
    }
    
    next(); // Chama o próximo middleware ou rota se a validação passar
  } catch (err) {
    console.error('Erro interno no middleware de pedido:', err); // Log de erro para debug
    res.status(500).json({
      message: 'Erro interno no servidor', // Mensagem de erro genérica
    });
  }
};
