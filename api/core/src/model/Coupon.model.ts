import { BaseError } from "../helpers/BaseError"
import { Either, right, left } from "@sweet-monads/either"
import prisma from "./prisma"
import { StatusCode } from "../helpers/controllerStatusCode"
import { couponOutput, couponInput, couponUpdate } from "../types/Coupon/coupon"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export const Coupon = {
  async get(): Promise<Either<BaseError, couponOutput[]>> {
    try {
      const coupons = await prisma.coupon.findMany()
      return right(coupons)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },
  async getByCode(code: string): Promise<Either<BaseError, couponOutput | null>> {
    try {
      const coupon = await prisma.coupon.findFirst({
        where: {
          code
        }
      })
      return right(coupon)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },
  async create(data: couponInput): Promise<Either<BaseError, couponOutput>> {
    try {
      const newCoupon = await prisma.coupon.create({
        data: {
          ...data,
          expireAt: new Date(data.expireAt),
        }
      })
      return right(newCoupon)
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === "SQLITE_CONSTRAINT" && error.message.includes("UNIQUE constraint failed")) {
          return left(new BaseError("código já existe! tente reativar o mesmo.", 409) )
        }
      }
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },
  async update(id: number, data: couponUpdate): Promise<Either<BaseError, couponOutput>> {
    try {
      const updatedCoupon = await prisma.coupon.update({ where: { id }, data:{
        ...data,
        expireAt: new Date(data.expireAt as Date),

      } })
      return right(updatedCoupon)
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === "SQLITE_CONSTRAINT" && error.message.includes("UNIQUE constraint failed")) {
          return left(new BaseError("código já existe! tente reativar o mesmo.", 409) )
        }
      }
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },
  async delete(id: number): Promise<Either<BaseError, boolean>> {
    try {
      await prisma.coupon.delete({ where: { id } })
      return right(true)
    } catch (error) {
      return left(new BaseError("Não foi possível deletar o cupom!", StatusCode.BAD_REQUEST))
    }
  }
}
