import { StatusCode } from "../helpers/controllerStatusCode";
import { NextFunction, Request, Response } from "express";
import { couponSchema } from "../validations/joi/CouponSchema";

export const createMiddleCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const { error } = couponSchema.validate(body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      })
    }
    next();
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Erro interno no servidor"
    })
  }

}