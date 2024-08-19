import { StatusCode } from '../helpers/controllerStatusCode';
import { BaseError } from '../helpers/BaseError';
import { CategoriesService } from '../service/Categories.service';
import { Request, Response } from 'express';

export const get = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoriesService.get()
    if (categories instanceof BaseError) {
      return res.status(categories.statusCode).json({ message: categories.message })
    }
    return res.status(StatusCode.CREATED).json(categories)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}
