import prisma from "./prisma"
import { userInput } from "../types/user/user"
export const User = {
  async get() {
    try {
      return await prisma.user.findMany()
    } catch (error) {
      return error
    }
  },

  async getOne(id: number) {
    try {
      return await prisma.user.findUnique({ where: { id } })

    } catch (error) {
      return error
    }
  },

  async create(data: userInput) {
    try {
      return await prisma.user.create({ data })
    } catch (error) {
      return error
    }
  },
  async update(id: number, data: userInput) {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      return user
    } catch (error) {
      return error
    }
  },

  async delete(id: number) {
    try {
      return await prisma.user.delete({ where: { id } })
    } catch (error) {
      return error
    }
  }
}