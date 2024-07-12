import { BaseError } from "../helpers/BaseError"
import { Either, left, right } from "@sweet-monads/either"
import prisma from "./prisma"
// import { StatusCode } from "../helpers/controllerStatusCode"
import { avaliationsInput, avaliationsOutput } from "@/types/avaliation/avaliations"

export const Avaliations = {
  async create(data: avaliationsInput): Promise<Either<BaseError, avaliationsOutput>> {
    console.log("🚀 ~ create ~ data:", data)
    try {
      const newAvaliation = await prisma.avaliationOnProduct.create({
          data: {
            ...data,
            productId: data.productId,
            userId: data.userId
          }
      })
      console.log("🚀 ~ create ~ newAvaliation:", newAvaliation)

      return right(newAvaliation)
    } catch (error) {
      console.log("🚀 ~ create ~ error:", error)
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  }
}