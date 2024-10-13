// services/OrderServices.ts

import { Order } from '../model/Orders.model';
import { BaseError } from '../helpers/BaseError';
import { StatusCode } from '../helpers/controllerStatusCode';
import { OrderInput } from '../types/order/order.type';

export const OrderServices = {
  // async getAll() {
  //   try {
  //     const orders = await Order.getAll();
  //     if (orders.isLeft()) {
  //       return new BaseError(orders.value.message, orders.value.statusCode);
  //     }
  //     return orders.value;
  //   } catch (error) {
  //     return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
  //   }
  // },

  async getByUserId(userId: number) {
    try {
      const orders = await Order.getByUserId(userId);
      if (orders.isLeft()) {
        return new BaseError(orders.value.message, orders.value.statusCode);
      }
      return orders.value;
    } catch (error) {
      return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
    }
  },
  async create(orderData: OrderInput) {
    try {
      const order = await Order.create(orderData);
      if (order.isLeft()) {
        return new BaseError(order.value.message, order.value.statusCode);
      }
      return order.value;
    } catch (error) {
      return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
    }
  },

  // async getOne(id: number) {
  //   try {
  //     const order = await Order.getOne(id);
  //     if (order.isLeft()) {
  //       return new BaseError(order.value.message, order.value.statusCode);
  //     }
  //     return order.value;
  //   } catch (error) {
  //     return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
  //   }
  // },


  // async update(id: number, orderData: OrderUpdate) {
  //   try {
  //     const order = await Order.update(id, orderData);
  //     if (order.isLeft()) {
  //       return new BaseError(order.value.message, order.value.statusCode);
  //     }
  //     return order.value;
  //   } catch (error) {
  //     return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
  //   }
  // },

  //   async remove(id: number) {
  //     try {
  //       const result = await Order.delete(id);
  //       if (result.isLeft()) {
  //         return new BaseError(result.value.message, result.value.statusCode);
  //       }
  //       return { message: "Pedido deletado com sucesso!" };
  //     } catch (error) {
  //       return new BaseError("Ocorreu um erro inesperado!", StatusCode.INTERNAL_SERVER_ERROR);
  //     }
  //   },
};