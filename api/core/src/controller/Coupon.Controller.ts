import { StatusCode } from '../helpers/controllerStatusCode';
import { BaseError } from '../helpers/BaseError';
import { CouponService } from '../service/Coupon.service';
import { Request, Response } from 'express';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const coupons = await CouponService.getAll()
    if (coupons instanceof BaseError) {
      return res.status(coupons.statusCode).json({ message: coupons.message })
    }
    res.status(StatusCode.OK).json(coupons);
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}


export const getOne = async (req: Request, res: Response) => {
  try {
    const coupons = await CouponService.getByCode(req.body.code)
    if (coupons instanceof BaseError) {
      return res.status(coupons.statusCode).json({ message: coupons.message })
    }
    res.status(StatusCode.OK).json(coupons);
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const coupon = await CouponService.create(data)
    if (coupon instanceof BaseError) {
      return res.status(coupon.statusCode).json({ message: coupon.message })
    }
    res.status(StatusCode.CREATED).json(coupon);
  }
  catch (error: any) {
    res.status(error.statusCode).json({
      message: error.message
    })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const data = req.body
    const coupon = await CouponService.update(id, data)
    if (coupon instanceof BaseError) {
      return res.status(coupon.statusCode).json({ message: coupon.message })
    }
    res.status(StatusCode.OK).json(coupon);
  } catch (error: any) {
    res.status(error.statusCode).json({
      message: error.message
    })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const coupon = await CouponService.delete(id)
    if (coupon instanceof BaseError) {
      return res.status(coupon.statusCode).json({ message: coupon.message })
    }
    res.status(200).json(coupon?.message);
  } catch (error: any) {
    res.status(error.statusCode).json({
      message: error.message
    })
  }
}