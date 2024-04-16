import { Router } from 'express';
import { getAll, getOne, create, remove, update, login } from "../controller/User.controller";
import { userMiddlewareCreated } from '../middleware/userMiddle';
import { authMiddleware } from '../middleware/authMiddle';


const usersRouter = Router();


usersRouter.get('/',authMiddleware , getAll);
usersRouter.get('/:id', authMiddleware, getOne);
usersRouter.post('/', authMiddleware,userMiddlewareCreated, create);
usersRouter.put('/:id',authMiddleware ,update);
usersRouter.delete('/:id', authMiddleware,remove);
usersRouter.post('/login', login)



export default usersRouter;
