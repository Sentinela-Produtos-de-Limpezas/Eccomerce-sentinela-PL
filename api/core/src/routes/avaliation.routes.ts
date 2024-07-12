import { Router } from 'express';
import { create } from "../controller/Avaliation.controller";



const avaliationRouter = Router();


avaliationRouter.post('/', create);



export default avaliationRouter;
