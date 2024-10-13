import { Order as PrismaOrder } from '@prisma/client';
import { Either, left, right } from '@sweet-monads/either';
import { BaseError } from '../helpers/BaseError';
import prisma from './prisma';
import { OrderInput } from '../types/order/order.type'; // As definições de tipos devem ser criadas

export const Order = {
  async getByUserId(userId: number): Promise<Either<BaseError, PrismaOrder[]>> {
    try {
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {

          products: {
            include: {
              product: true, // Inclui detalhes do produto
            },
          },
          coupon: true,
        },
      });
      return right(orders);
    } catch (error: any) {
      return left(new BaseError("Ocorreu um erro inesperado ao buscar os pedidos do usuário!"));
    }
  },

  async create(orderData: OrderInput): Promise<Either<BaseError, PrismaOrder>> {
    try {
      const newOrder = await prisma.order.create({
        data: {
          ...orderData,
          products: {
            create: orderData.products.map((product: { productId: any; quantity: any; }) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
          },
        },
        include: {
          products: {
            include: {
              product: true, // Inclui detalhes do produto
            },
          },
          user: true,
          coupon: true,
        },
      });
      return right(newOrder);
    } catch (error: any) {
      console.log("🚀 ~ create ~ error:", error)
      return left(new BaseError("Ocorreu um erro inesperado ao criar o pedido!"));
    }
  },
  // async getAll(): Promise<Either<BaseError, PrismaOrder[]>> {
  //   try {
  //     const orders = await prisma.order.findMany({
  //       include: {
  //         products: {
  //           include: {
  //             product: true, // Inclui detalhes do produto
  //           },
  //         },
  //         user: true,
  //         coupon: true,
  //       },
  //     });
  //     return right(orders);
  //   } catch (error: any) {
  //     return left(new BaseError("Ocorreu um erro inesperado ao buscar os pedidos!"));
  //   }
  // },

  // async getOne(id: number): Promise<Either<BaseError, PrismaOrder | null>> {
  //   try {
  //     const order = await prisma.order.findUnique({
  //       where: { id },
  //       include: {
  //         products: {
  //           include: {
  //             product: true, // Inclui detalhes do produto
  //           },
  //         },
  //         user: true,
  //         coupon: true,
  //       },
  //     });
  //     return right(order);
  //   } catch (error: any) {
  //     return left(new BaseError("Ocorreu um erro inesperado ao buscar o pedido!"));
  //   }
  // },


  // async update(id: number, orderData: OrderUpdate): Promise<Either<BaseError, PrismaOrder>> {
  //   try {
  //     const updatedOrder = await prisma.order.update({
  //       where: { id },
  //       data: orderData,
  //       include: {
  //         products: {
  //           include: {
  //             product: true, // Inclui detalhes do produto
  //           },
  //         },
  //         user: true,
  //         coupon: true,
  //       },
  //     });
  //     return right(updatedOrder);
  //   } catch (error: any) {
  //     if (error.code === 'P2025') {
  //       return left(new BaseError("Pedido não encontrado!", StatusCode.NOT_FOUND));
  //     }
  //     return left(new BaseError("Não foi possível atualizar o pedido!", StatusCode.BAD_REQUEST));
  //   }
  // },

  // async delete(id: number): Promise<Either<BaseError, boolean>> {
  //   try {
  //     const orderToDelete = await prisma.order.findUnique({
  //       where: { id },
  //     });

  //     if (!orderToDelete) {
  //       return left(new BaseError("Pedido não encontrado!", StatusCode.NOT_FOUND));
  //     }

  //     // Deleta o pedido e os produtos associados
  //     await prisma.order.delete({
  //       where: { id },
  //     });

  //     return right(true);
  //   } catch (error: any) {
  //     if (error.code === 'P2025') {
  //       return left(new BaseError("Pedido não encontrado!", StatusCode.NOT_FOUND));
  //     }
  //     return left(new BaseError("Não foi possível deletar o pedido!", StatusCode.BAD_REQUEST));
  //   }
  // },
};
