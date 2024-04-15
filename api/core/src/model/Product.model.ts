import { productInput, productUpdate } from "@/types/products/product"
import prisma from "./prisma"


export const Product = {
  async get() {
    try {
      return await prisma.product.findMany()
    } catch (error) {
      return error
    }
  },

  async getOne(id: number) {
    try {
      return await prisma.product.findUnique({ where: { id } })

    } catch (error) {
      return error
    }
  },

  async create(productDate: productInput) {
    try {
      return await prisma.product.create({ data: productDate})
    } catch (error) {
      return error
    }
  },

  async update(id: number, productDate: productUpdate) {
    try {
      const product = await prisma.product.findUnique({ where: { id } })
      return product
    } catch (error) {
      return error
    }
  },

  async delete(id: number) {
    try {
      return await prisma.product.delete({ where: { id } })
    } catch (error) {
      return error
    }
  }

}
