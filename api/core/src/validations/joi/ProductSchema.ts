import { productBody } from "../../types/products/product"
import * as joi from "joi"


//terminar a construção do schema

export const productSchema = joi.object<productBody>({
  name: joi.string().required().messages({
    "any.required": "Por favor, informe o nome!",
  }),
  price: joi.number().required().messages({
    "any.required": "Por favor, informe o preço!",
  }),
  sku: joi.string().required().messages({
    "any.required": "Por favor, informe o sku!",
  }),
})