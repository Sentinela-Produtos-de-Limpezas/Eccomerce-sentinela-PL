import { User } from "../model/Users.model"
import { userInput } from '../types/user/user';
import { BaseError } from '../helpers/BaseError';
import { StatusCode } from "../helpers/controllerStatusCode";
import { comparePassword, hashPassword } from "../helpers/saltPassword";

const UserService = {
  async getAll() {
    try {
      const users = await User.get()
      if (users.isLeft()) return new BaseError(users.value.message, users.value.statusCode)
      if (users.isRight()) return users.value
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async getOne(id: number) {
    try {
      const user = await User.getOne(id)
      if (user.isRight()) {
        if (user.value === null) return new BaseError("Usuário não encontrado !", StatusCode.NOT_FOUND)
        console.log("🚀 ~ getOne ~ user:", await comparePassword("flaco0x01", user.value.password))
        
        return user.value
      }
      if (user.isLeft()) return new BaseError(user.value.message, StatusCode.INTERNAL_SERVER_ERROR)
      return user
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async create(UserBody: userInput) {
    try {

      const existingUser = await User.findValidationCreateUser({
        email: UserBody.email,
        cpforcnpj: UserBody.cpforcnpj,
        phone: UserBody.phone
      })
      if (existingUser.isRight()) {
        const existingField =
          existingUser.value.email === UserBody.email
            ? "email"
            : existingUser.value.cpforcnpj === UserBody.cpforcnpj
              ? "CPF/CNPJ"
              : "phone";
        return new BaseError(`O ${existingField} já está em uso!`, StatusCode.BAD_REQUEST);
      }

      const alteredBodyUser = {
        ...UserBody,
        password: hashPassword(UserBody.password)
      }

      const user = await User.create(alteredBodyUser)
      return user.value
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async update(id: number, userBody: userInput) {
    try {
      const existingUser = await User.getOne(id)
      if (existingUser.isLeft()) return new BaseError(existingUser.value.message, existingUser.value.statusCode)
      if (userBody.password) userBody.password = hashPassword(userBody.password)
      const existingData = await User.findValidationCreateUser({
        email: userBody.email,
        cpforcnpj: userBody.cpforcnpj,
        phone: userBody.phone
      })
      if (existingData.isRight()) {
        const existingField =
          existingData.value.email === userBody.email
            ? "email"
            : existingData.value.cpforcnpj === userBody.cpforcnpj
              ? "CPF/CNPJ"
              : "phone";
        return new BaseError(`O ${existingField} já está em uso!`, StatusCode.BAD_REQUEST);
      }
      const user = await User.update(id, userBody)
      if (user.isLeft()) throw new BaseError(user.value.message, StatusCode.INTERNAL_SERVER_ERROR)
      if (user.isRight()) return user.value
      return user
    } catch (error) {
      console.log("🚀 ~ update ~ error:", error)
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async remove(id: number) {
    try {
      const user = await User.delete(id)
      if (user.isLeft()) return new BaseError(user.value.message, user.value.statusCode)
      return user.value
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },
}

export {
  UserService
}