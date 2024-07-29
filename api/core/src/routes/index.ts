import { Router } from 'express';
import userRoutes from "./user.routes"
import productRoutes from "./product.routes"
import avaliationRouter from './avaliation.routes';
import couponRoutes from './coupon.routes';
const routes = Router();

routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/avaliation', avaliationRouter)
routes.use('/coupon', couponRoutes)
export default routes;





