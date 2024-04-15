import prisma from "./prisma"
import { ScopeValidationUser, userInput, userOutput } from "../types/user/user"
import { BaseError } from "../helpers/BaseError"
import { Either, left, right } from "@sweet-monads/either"
import { StatusCode } from "../helpers/controllerStatusCode"

export const User = {
  async get(): Promise<Either<BaseError, userOutput[]>> {
    try {
      const users = await prisma.user.findMany()
      return right(users)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async getOne(id: number): Promise<Either<BaseError, userOutput | null>> {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      return right(user)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async create(data: userInput): Promise<Either<BaseError, userOutput>> {
    try {
      const newUser = await prisma.user.create({ data });
      return right(newUser);
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },
  async update(id: number, data: userInput): Promise<Either<BaseError, userOutput>> {
    try {
      const updatedUser = await prisma.user.update({ where: { id }, data })
  
      return right(updatedUser)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async delete(id: number): Promise<Either<BaseError, boolean>> {
    try {
      await prisma.user.delete({ where: { id } })
      return right(true)
    } catch (error) {
      return left(new BaseError("Não foi possível deletar o usuário!", StatusCode.BAD_REQUEST))
    }
  },

  async findValidationCreateUser(scope: ScopeValidationUser): Promise<Either<null | BaseError, userOutput>> {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: scope.email },
            { cpforcnpj: scope.cpforcnpj },
            { phone: scope.phone },
          ],
        },
      });
      if (!existingUser) return left(null)
      return right(existingUser)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  }
}