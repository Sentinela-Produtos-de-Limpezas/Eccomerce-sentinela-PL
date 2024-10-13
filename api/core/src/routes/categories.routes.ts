import { Router } from 'express';
import { get } from "../controller/Categories.constroller";



const CategoriesRouter = Router();


CategoriesRouter.get('/', get);



export default CategoriesRouter;
