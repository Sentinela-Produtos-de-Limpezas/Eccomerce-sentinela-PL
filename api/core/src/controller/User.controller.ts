import { Request, Response } from "express";
import { StatusCode } from '../helper/controllerStatusCode';
import { service } from "../service/Users.service";


const getAll = async (req: Request, res: Response) => {
  try {
    const users = await service.getAll()
    return res.status(StatusCode.OK).json(users)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const getOne = async (req: Request, res: Response) => {
  try {
    const user = await service.getOne(+req.params.id)
    return res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const user = await service.create(req.body)
    return res.status(StatusCode.CREATED).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const user = await service.update(+req.params.id, req.body)
    return res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const user = await service.remove(+req.params.id)
    return res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }

}

export {
  getAll,
  getOne,
  create,
  update,
  remove
}