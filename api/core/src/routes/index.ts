import { Router } from 'express';
import userRoutes from "./user.routes"
import productRoutes from "./product.routes"
import avaliationRouter from './avaliation.routes';
const routes = Router();

routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/avaliation', avaliationRouter)
export default routes;





