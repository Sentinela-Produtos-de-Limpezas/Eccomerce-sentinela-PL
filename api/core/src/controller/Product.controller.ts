import { Request, Response } from 'express';
import { StatusCode } from '../helpers/controllerStatusCode';
import { ProductServices } from '../service/Product.service';

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await ProductServices.getAll()
    return res.status(StatusCode.OK).json(products)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.getOne(+req.params.id)
    return res.status(StatusCode.OK).json(product)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}


export const create = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.create(req.body)
    return res.status(StatusCode.CREATED).json(product)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}


export const update = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.update(+req.params.id, req.body)
    return res.status(StatusCode.OK).json(product)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.remove(+req.params.id)
    return res.status(StatusCode.OK).json(product)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}
