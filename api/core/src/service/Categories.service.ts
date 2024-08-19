import { StatusCode } from "../helpers/controllerStatusCode"
import { BaseError } from "../helpers/BaseError"
import { Categories } from "../model/Categories.model"

export const CategoriesService = {
  async get() {
    try {
      const categories = await Categories.get()
      if (categories.isLeft()) {
        return new BaseError(categories.value.message, categories.value.statusCode)
      }
      if (categories.isRight()) {
        return categories.value
      }
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}