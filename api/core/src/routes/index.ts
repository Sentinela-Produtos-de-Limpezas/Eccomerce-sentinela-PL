import { Router } from 'express';
import userRoutes from "./user.routes"
import productRoutes from "./product.routes"
import avaliationRouter from './avaliation.routes';
import couponRoutes from './coupon.routes';
import categoriesRoutes from './categories.routes';
import addressRouter from './addrees.routes';
const routes = Router();

routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/avaliation', avaliationRouter)
routes.use('/coupon', couponRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/address', addressRouter)
export default routes;





