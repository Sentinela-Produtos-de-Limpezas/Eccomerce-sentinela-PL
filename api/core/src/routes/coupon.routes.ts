import { getAll, getOne, create, remove, update } from '../controller/Coupon.Controller';
import { Router } from 'express';
import { createMiddleCoupon } from '../middleware/createMiddleCoupon';
import { authMiddleware } from '../middleware/authMiddle';


const couponRoutes = Router()

couponRoutes.get('/',authMiddleware ,getAll)
couponRoutes.get('/code', getOne)
couponRoutes.post('/', authMiddleware, createMiddleCoupon, create)
couponRoutes.put('/:id', authMiddleware, update)
couponRoutes.delete('/:id', authMiddleware, remove)


export default couponRoutes