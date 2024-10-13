import { BaseError } from "../helpers/BaseError"
import { StatusCode } from "../helpers/controllerStatusCode"
import { Coupon } from "../model/Coupon.model"
import { couponInput, couponUpdate } from "../types/Coupon/coupon"
import voucher_codes from "voucher-code-generator"

export const CouponService = {
  async getAll() {
    try {
      const coupons = await Coupon.get()
      if (coupons.isLeft()) return new BaseError(coupons.value.message, coupons.value.statusCode)
      if (coupons.isRight()) return coupons.value.map(coupon => ({ ...coupon, status: coupon.status ? "Ativo" : "Inativo" }))
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async getByCode(code: string) {
    try {
      const coupon = await Coupon.getByCode(code)
      if (coupon.isLeft()) return new BaseError(coupon.value.message, coupon.value.statusCode)
      if (coupon.isRight()) {
        if (!coupon.value) return new BaseError("Cupom não encontrado!", StatusCode.NOT_FOUND)
        return ({ ...coupon.value, status: coupon.value.status ? "Ativo" : "Inativo" })
      }
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },

  async create(data: couponInput) {
    try {
      if (!data.code) {
        const voucher = voucher_codes.generate({
          length: 5,
          prefix: "SPL-",
          charset: voucher_codes.charset("alphanumeric")
        })
        data.code = voucher[0]
      }
      const newCoupon = await Coupon.create(data)
      if (newCoupon.isLeft()) return new BaseError(newCoupon.value.message, newCoupon.value.statusCode)

      if (newCoupon.isRight()) {
        return ({ ...newCoupon.value, status: newCoupon.value.status ? "Ativo" : "Inativo" })
      }
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)

    }
  },
  async update(id: number, data: couponUpdate) {
    try {
      const updatedCoupon = await Coupon.update(id, data)
      if (updatedCoupon.isLeft()) return new BaseError(updatedCoupon.value.message, updatedCoupon.value.statusCode)
      if (updatedCoupon.isRight()) {
        return ({ ...updatedCoupon.value, status: updatedCoupon.value.status ? "Ativo" : "Inativo" })
      }
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  },
  async delete(id: number) {
    try {
      const deletedCoupon = await Coupon.delete(id)
      if (deletedCoupon.isLeft()) return new BaseError(deletedCoupon.value.message, deletedCoupon.value.statusCode)
      if (deletedCoupon.isRight()) return { message: "Cupom excluído com sucesso!" }
    } catch (error) {
      return new BaseError("error", StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}