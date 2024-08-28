import { Request, Response } from 'express';
import { StatusCode } from '../helpers/controllerStatusCode';
import { ProductServices } from '../service/Product.service';
import { BaseError } from '../helpers/BaseError';

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await ProductServices.getAll()
    if(products instanceof BaseError) return res.status(products.statusCode).json({ message: products.message })
    return res.status(StatusCode.OK).json(products)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

export const getAllByCategory = async (req: Request, res: Response) => {
  try {
    const category_name = req.query.category_name
    const products = await ProductServices.getAllByCategory(category_name as string)
    if(products instanceof BaseError) return res.status(products.statusCode).json({ message: products.message })
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
    if(product instanceof BaseError) return res.status(product.statusCode).json({ message: product.message })
    return res.status(StatusCode.OK).json(product)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}


export const create = async (req: Request, res: Response) => {
  try {
    if(!req.file) return res.status(StatusCode.BAD_REQUEST).json({ message: 'Imagem não encontrada!'})
    const product = await ProductServices.create(req.body, req.file?.originalname)
  if (product instanceof BaseError) {
    return res.status(product.statusCode).json({ message: product.message })
  }
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
    if(product instanceof BaseError) return res.status(product.statusCode).json({ message: product.message })
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
    if(product instanceof BaseError) return res.status(product.statusCode).json({ message: product.message })
    if(product) return res.status(StatusCode.OK).json({ message: 'Produto deletado com sucesso!'})
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}
