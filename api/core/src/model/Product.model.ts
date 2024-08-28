import { productInput, productOutput, productUpdate, ScopeValidationProduct } from "../types/products/product"
import prisma from "./prisma"
import { Either, left, right } from '@sweet-monads/either';
import { BaseError } from '../helpers/BaseError';
import { StatusCode } from "../helpers/controllerStatusCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export const Product = {
  async get(): Promise<Either<BaseError, productOutput[]>> {
    try {
      const products = await prisma.product.findMany({
        include: {
          avaliations: {
            orderBy: { id: "desc" },
            select: {
              id: true,
              comment: true,
              rating: true,
              user: {
                select: {
                  name: true,
                  lastname: true

                }
              }
            },
          },
        }
      })
      return right(products)
    } catch (error) {
      console.log("🚀 ~ get ~ error:", error)
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },
  async getByCategory(category_name: string): Promise<Either<BaseError, productOutput[]>> {
    try {
      const products = await prisma.product.findMany({
        where:{
          categories:{
            some: {
              category: {
               name: category_name
              }
            }
          }
        },
        include: {

          avaliations: {
            orderBy: { id: "desc" },
            select: {
              id: true,
              comment: true,
              rating: true,
              user: {
                select: {
                  name: true,
                  lastname: true

                }
              }
            },
          },
        }
      })
      return right(products)
    } catch (error) {
      console.log("🚀 ~ get ~ error:", error)
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async getOne(id: number): Promise<Either<BaseError, productOutput | null>> {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          avaliations: {
            select: {
              id: true,
              comment: true,
              rating: true,
              user: {
                select: {
                  name: true,
                  lastname: true

                }
              }
            }
          }
        }
      })
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
      if (error instanceof PrismaClientKnownRequestError) {
        return error.code === 'SQLITE_CONSTRAINT' ? left(new BaseError("Não foi possível atualizar o produto. O SKU e o nome devem ser únicos. Verifique se o novo SKU e nome já estão cadastrados para outro produto.", StatusCode.NOT_FOUND)) : left(new BaseError("Não foi possível atualizar o Produto!", StatusCode.BAD_REQUEST))
      }
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async delete(id: number): Promise<Either<BaseError, boolean>> {
    try {
      await prisma.product.delete({
        where: { id },
      }
      )
      return right(true)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return error.code === 'P2025' ? left(new BaseError("Produto não encontrado!", StatusCode.NOT_FOUND)) : left(new BaseError("Não foi possível deletar o Produto!", StatusCode.BAD_REQUEST))

      }
      return left(new BaseError("Não foi possível deletar o Produto!", StatusCode.BAD_REQUEST))
    }
  },


  async findValidationCreateProduct(scope: ScopeValidationProduct): Promise<Either<false | BaseError, true>> {
    try {
      const existingProduct = await prisma.product.findFirst({
        where: {
          OR: [
            { name: scope.name },
            { sku: scope.sku },
          ]
        }
      })

      if (existingProduct) {
        return left(false)
      }

      return right(true)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  }
}
