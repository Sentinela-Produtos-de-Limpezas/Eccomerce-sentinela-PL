import { NextFunction, Request, Response } from "express";
import { userSchema } from "../validations/joi/userSchema";
import { StatusCode } from "../helpers/controllerStatusCode";

export const userMiddlewareCreated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const { error } = userSchema.validate(body);
    if (error) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: error.details[0].message
      });
    }
    next();
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Erro interno no servidor"
    })
  }
};