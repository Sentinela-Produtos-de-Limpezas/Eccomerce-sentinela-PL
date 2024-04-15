import { Request, Response } from "express";
import { StatusCode } from '../helpers/controllerStatusCode';
import { UserService } from "../service/Users.service";
import { BaseError } from "../helpers/BaseError";


const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll()
    if (users instanceof BaseError) {
      return res.status(users.statusCode).json({ message: users.message })
    }
    return res.status(StatusCode.OK).json(users)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const getOne = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getOne(+req.params.id)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    } res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}


const create = async (req: Request, res: Response) => {
  try {
    const user = await UserService.create(req.body)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }
    return res.status(StatusCode.CREATED).json(user)
  } catch (error: any) {

    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const user = await UserService.update(+req.params.id, req.body)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }
    return res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const user = await UserService.remove(+req.params.id)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }
    return res.status(StatusCode.OK).json(user)
  } catch (error: any) {
    res.status(error.StatusCode).json({
      message: error.message
    })
  }

}
const login = async (req: Request, res: Response) => {
  try {
    const user = await UserService.login(req.body.email, req.body.password)
    if (user instanceof BaseError) {
      return res.status(user.statusCode).json({ message: user.message })
    }
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
  remove,
  login
}