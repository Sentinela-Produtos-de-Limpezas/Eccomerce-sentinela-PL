// controllers/OrderController.ts

import { Request, Response } from 'express';
import { StatusCode } from '../helpers/controllerStatusCode';
import { OrderServices } from '../service/Orders.service';
import { BaseError } from '../helpers/BaseError';

// export const getAll = async (_req: Request, res: Response) => {
//   try {
//     const orders = await OrderServices.getAll();
//     if (orders instanceof BaseError) {
//       return res.status(orders.statusCode).json({ message: orders.message });
//     }
//     return res.status(StatusCode.OK).json(orders);
//   } catch (error: any) {
//     return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
//   }
// };

export const getByUserId = async (req: Request, res: Response) => {
  try {
    const userId = +req.params.userId;
    const orders = await OrderServices.getByUserId(userId);
    if (orders instanceof BaseError) {
      return res.status(orders.statusCode).json({ message: orders.message });
    }
    return res.status(StatusCode.OK).json(orders);
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// export const getOne = async (req: Request, res: Response) => {
//   try {
//     const order = await OrderServices.getOne(+req.params.id);
//     if (order instanceof BaseError) {
//       return res.status(order.statusCode).json({ message: order.message });
//     }
//     return res.status(StatusCode.OK).json(order);
//   } catch (error: any) {
//     return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
//   }
// };

export const create = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const order = await OrderServices.create(orderData);
    if (order instanceof BaseError) {
      return res.status(order.statusCode).json({ message: order.message });
    }
    return res.status(StatusCode.CREATED).json(order);
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// export const update = async (req: Request, res: Response) => {
//   try {
//     const id = +req.params.id;
//     const orderData = req.body;
//     const order = await OrderServices.update(id, orderData);
//     if (order instanceof BaseError) {
//       return res.status(order.statusCode).json({ message: order.message });
//     }
//     return res.status(StatusCode.OK).json(order);
//   } catch (error: any) {
//     return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
//   }
// };

// export const remove = async (req: Request, res: Response) => {
//   try {
//     const id = +req.params.id;
//     const result = await OrderServices.remove(id);
//     if (result instanceof BaseError) {
//       return res.status(result.statusCode).json({ message: result.message });
//     }
//     return res.status(StatusCode.OK).json(result);
//   } catch (error: any) {
//     return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
//   }
// };
