import { BaseError } from "../helpers/BaseError"
import { Either, left, right } from "@sweet-monads/either"
import prisma from "./prisma"
import { StatusCode } from "../helpers/controllerStatusCode"
import { productOutput } from "@/types/products/product"

type categoriesOutput = {
  id: number
  name: string
}

// type categoriesInput = {
//   name: string
//   description: string
// }

// type categoriesUpdate = {
//   name: string
// }


export const Categories = {
  async get(): Promise<Either<BaseError, categoriesOutput[]>> {
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          description: false,
        }
      })
      return right(categories)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },
  async getOne(id: number): Promise<Either<BaseError, categoriesOutput | null>> {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: false,
        }
      })
      return right(category)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  // async create(data: categoriesInput): Promise<Either<BaseError, categoriesOutput>> {
  //   try {
  //     const newCategory = await prisma.category.create({ data });
  //     return right(newCategory);
  //   } catch (error) {
  //     return left(new BaseError("Ocorreu um erro inesperado!"))
  //   }
  // },

  // async update(id: number, data: categoriesUpdate): Promise<Either<BaseError, categoriesOutput>> {
  //   try {
  //     const updatedCategory = await prisma.category.update({ where: { id }, data })

  //     return right(updatedCategory)
  //   } catch (error) {
  //     return left(new BaseError("Ocorreu um erro inesperado!"))
  //   }
  // },

  async delete(id: number): Promise<Either<BaseError, boolean>> {
    try {
      await prisma.category.delete({ where: { id } })
      return right(true)
    } catch (error) {
      return left(new BaseError("Não foi possível deletar a categoria!", StatusCode.BAD_REQUEST))
    }
  }
}