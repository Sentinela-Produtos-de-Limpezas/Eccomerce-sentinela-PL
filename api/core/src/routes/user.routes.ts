import { Router } from 'express';
import { getAll, getOne, create, remove, update } from "../controller/User.controller";
import { userMiddleCreated } from '../middleware/userMiddle';


const usersRouter = Router();


usersRouter.get('/', getAll);
usersRouter.get('/:id', getOne);
usersRouter.post('/',userMiddleCreated ,create);
usersRouter.put('/:id', update);

























usersRouter.delete('/:id', remove);



export default usersRouter;
