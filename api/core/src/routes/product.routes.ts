
import { Router } from 'express';

import { getAll, getOne, create, remove, update } from "../controller/Product.controller";

const productRouter = Router();

productRouter.get('/', getAll);
productRouter.get('/:id', getOne);
productRouter.post('/', create);
productRouter.put('/:id', update);
productRouter.delete('/:id', remove);

export default productRouter;