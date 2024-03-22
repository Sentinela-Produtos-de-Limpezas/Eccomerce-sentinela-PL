import { User } from "../model/Users.model"
import { userInput } from '../types/user/user';
import { BaseError } from '../helper/BaseError';
import { StatusCode } from "../helper/controllerStatusCode";

const service = {
  async getAll() {
    try {
      const users = await User.get()
      return users
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async getOne(id: number) {
    try {
      const user = await User.getOne(id)
      return user
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }

  },

  async create(UserBody: userInput) {
    try {
      const user = await User.create(UserBody)
      return user
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async update(id: number, userBody: userInput) {
    try {
      const user = await User.update(id, userBody)
      if (!user) return { message: "User not found" }
      return user
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async remove(id: number) {
    try {
      const user = await User.delete(id)
      if (!user) return { message: "User not found" }
      return user
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },
}

export {
  service
}