import { NextFunction, Request, Response } from "express";
import { userSchema } from "../validations/joi/userSchema";
import { StatusCode } from "../helpers/controllerStatusCode";

export const userMiddleCreated = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const { error } = userSchema.validate(body);
  if (error) {
    return res.status(StatusCode.NOT_FOUND).json({
      message: error.message
    });
  }
  next();
  console.log("User Middleware");
}