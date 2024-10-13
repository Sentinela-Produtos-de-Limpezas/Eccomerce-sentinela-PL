import { Router } from 'express';
import { getAll, getOne, create, update, remove, getByUserId } from '../controller/Address.controller';
import { createMiddleAddress } from '../middleware/createMiddleAddress'; // Se precisar de middleware específico
import { authMiddleware } from '../middleware/authMiddle';

const addressRouter = Router();

// Rotas para endereços
addressRouter.get('/', authMiddleware, getAll); 
addressRouter.get('/:id', authMiddleware, getOne);
addressRouter.get('/user/:userId', authMiddleware, getByUserId);
addressRouter.post('/', authMiddleware, createMiddleAddress, create);
addressRouter.put('/:id', authMiddleware, update);
addressRouter.delete('/:id', authMiddleware, remove);

export default addressRouter;
