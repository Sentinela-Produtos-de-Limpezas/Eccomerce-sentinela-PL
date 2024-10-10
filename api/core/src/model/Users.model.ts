import prisma from "./prisma"
import { ScopeValidationUser, userInput, userInputWithAddres, userOutput, UserOutputLogin } from "../types/user/user"
import { BaseError } from "../helpers/BaseError"
import { Either, left, right } from "@sweet-monads/either"
import { StatusCode } from "../helpers/controllerStatusCode"

export const User = {
  async get(): Promise<Either<BaseError, Omit<userOutput, "password">[]>> {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          lastname: true,
          email: true,
          phone: true,
          cpforcnpj: true,
        }
      })
      return right(users)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async getOne(id: number): Promise<Either<BaseError, Omit<userOutput, "password"> | null>> {
    try {
      const user = await prisma.user.findUnique({where: { id },
        select:{
          id: true,
          name: true,
          lastname: true,
          email: true,
          phone: true,
          cpforcnpj: true,
        }
      })
      return right(user)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async create(data: userInput): Promise<Either<BaseError, Omit<userOutput, "password">>> {
    try {
      const newUser = await prisma.user.create({
        select: {
          id: true,
          name: true,
          lastname: true,
          email: true,
          phone: true,
          cpforcnpj: true,
        }, data: {
          ...data

        }
      },

      );
      return right(newUser);
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },

  async createWithAddress(data: userInputWithAddres): Promise<Either<BaseError, Omit<userOutput, "password">>> {
    try {
      const newUser = await prisma.user.create({
        select: {
          id: true,
          name: true,
          lastname: true,
          email: true,
          phone: true,
          cpforcnpj: true,
        }, data: {
          ...data,
          address: {
            create: {
              Street: data.address.street,
              Number: data.address.number,
              City: data.address.city,
              isMain: data.address.isMain,
              zipCode: data.address.zipCode
            }
          }
        }
      },
      );
      console.log("🚀 ~ createWithAddress ~ newUser:", newUser)
      return right(newUser);
    } catch (error) {
      console.log("🚀 ~ createWithAddress ~ error:", error)
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  },
  async update(id: number, data: userInput): Promise<Either<BaseError, Omit<userOutput, "password">>> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id }, select: {
          id: true,
          name: true,
          lastname: true,
          email: true,
          phone: true,
          cpforcnpj: true,
        }, data
      });

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
  },
  async login(email: string): Promise<Either<BaseError, UserOutputLogin | null>> {
    try {
      const user = await prisma.user.findFirst({
        where: { email },
      })
      return right(user)
    } catch (error) {
      return left(new BaseError("Ocorreu um erro inesperado!"))
    }
  }
}