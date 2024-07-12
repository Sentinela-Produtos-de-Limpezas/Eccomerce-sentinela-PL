import { StatusCode } from "../helpers/controllerStatusCode"
import { BaseError } from "../helpers/BaseError"
import { Avaliations } from "../model/Avaliation.model"
import { avaliationsInput } from "../types/avaliation/avaliations"

export const AvaliationService = {
  async create(AvaliationData: avaliationsInput) {
    console.log("🚀 ~ create ~ AvaliationData:", AvaliationData)
    try {
      const avaliation = await Avaliations.create(AvaliationData)
      if(avaliation.isLeft()){
        return new BaseError(avaliation.value.message, avaliation.value.statusCode)
      }
      if(avaliation.isRight()) {
        return avaliation.value
      }
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}