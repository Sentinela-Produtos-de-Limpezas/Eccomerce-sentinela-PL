import { couponInput } from "@/types/Coupon/coupon";
import Joi from "joi";

export const couponSchema = Joi.object<couponInput>({
  code: Joi.string(),
  discount: Joi.number().messages({
    "any.required": "Por favor, informe o desconto",
    "number.min": "O desconto precisa ser um numero positivo",
  }).required(),
  expireAt: Joi.date().messages({
    "any.required": "Por favor, informe a data de expiracao",
    "date.min": "A data de expiracao precisa ser uma data futura",
  }).min(new Date()).required(),
  typeDiscount: Joi.string().messages({
    "any.required": "Por favor, informe o tipo de desconto",
    "string.enum": "Tipo de desconto invalido. Utilize 'percentage' ou 'fixed'",
  }).required(),
  status: Joi.boolean().messages({
    "any.required": "Por favor, informe o status",
    "boolean.base": "Status precisa ser um booleano",
  }).required(),
})