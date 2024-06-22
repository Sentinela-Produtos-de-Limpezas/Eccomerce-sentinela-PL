import { Router } from 'express';
import { getAll, getOne, create, remove, update, login, logout } from "../controller/User.controller";
import { userMiddlewareCreated } from '../middleware/userMiddle';
import { authMiddleware } from '../middleware/authMiddle';


const usersRouter = Router();


usersRouter.get('/',authMiddleware , getAll);
usersRouter.get('/:id', authMiddleware, getOne);
usersRouter.post('/',userMiddlewareCreated, create);
usersRouter.put('/:id',authMiddleware ,update);
usersRouter.delete('/:id', authMiddleware,remove);
usersRouter.post('/login', login)
usersRouter.post('/logout', authMiddleware, logout)



export default usersRouter;
