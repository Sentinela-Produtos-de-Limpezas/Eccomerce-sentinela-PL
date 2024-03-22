import { Router } from 'express';
import { getAll, getOne, create, remove, update } from "../controller/User.controller";


const usersRouter = Router();


usersRouter.get('/', getAll);
usersRouter.get('/:id', getOne);
usersRouter.post('/', create);
usersRouter.put('/:id', update);
usersRouter.delete('/:id', remove);



export default usersRouter;
