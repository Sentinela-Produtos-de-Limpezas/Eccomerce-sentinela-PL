import { productInput, productOutput, productUpdate } from "../types/products/product"
import prisma from "./prisma"
import { Either, left, right } from '@sweet-monads/either';
import { BaseError } from '../helpers/BaseError';


export const Product = {
  async get(): Promise<Either<BaseError, productOutput[]>> {
    try {
      const products = await prisma.product.findMany()
      return right(products)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async getOne(id: number): Promise<Either<BaseError, productOutput | null>> {
    try {
      const product = await prisma.product.findUnique({ where: { id } })
      return right(product)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async create(productDate: productInput): Promise<Either<BaseError, productOutput>> {
    try {
      const newProduct = await prisma.product.create({ data: productDate })
      return right(newProduct)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async update(id: number, productDate: productUpdate): Promise<Either<BaseError, productOutput>> {
    try {
      const product = await prisma.product.update({ where: { id }, data: productDate })

      return right(product)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async delete(id: number): Promise<Either<BaseError, boolean>> {
    try {
      await prisma.product.delete({ where: { id } })
      return right(true)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  }, 

  async findValidationCreateProduct(name: string, ): Promise<Either<false | BaseError, true>> {
    try {
      const existingProduct = await prisma.product.findFirst({
        where: {
          name
        }
      })

      if(existingProduct) {
        return left(false)
      }

      return right(true)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  }

}
