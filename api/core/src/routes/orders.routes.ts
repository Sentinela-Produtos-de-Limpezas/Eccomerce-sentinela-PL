// routes/OrderRoutes.ts
import { Router } from 'express';
import { create, getByUserId } from '../controller/Orders.controller';
import { authMiddleware } from '../middleware/authMiddle';

const orderRouter = Router();

// Rotas para pedidos
orderRouter.get('/user/:userId', authMiddleware, getByUserId); // Obter pedidos por usuário
orderRouter.post('/', authMiddleware, create); // Criar um novo pedido

export default orderRouter;
