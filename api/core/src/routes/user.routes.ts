import { Router } from 'express';
import { getAll, getOne, create, remove, update, login } from "../controller/User.controller";
import { userMiddleCreated } from '../middleware/userMiddle';


const usersRouter = Router();


usersRouter.get('/', getAll);
usersRouter.get('/:id', getOne);
usersRouter.post('/',userMiddleCreated ,create);
usersRouter.put('/:id', update);
usersRouter.post('/login', login)

























usersRouter.delete('/:id', remove);



export default usersRouter;
