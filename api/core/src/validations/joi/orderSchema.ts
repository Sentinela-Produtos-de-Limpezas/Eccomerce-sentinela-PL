// types/order/order.validation.ts

import Joi from 'joi';
import { OrderInput, ProductOnOrderInput } from '../../types/order/order.type';

// Esquema de validação para OrderInput
const orderSchema = Joi.object<OrderInput>({
  total: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'O total deve ser um número.',
      'number.positive': 'O total deve ser um valor positivo.',
      'any.required': 'O total é um campo obrigatório.',
    }),
  status: Joi.string()
    .valid('pending', 'completed', 'canceled') // Adicione outros estados válidos conforme necessário
    .required()
    .messages({
      'string.base': 'O status deve ser uma string.',
      'any.only': 'O status deve ser um dos seguintes valores: pending, completed, canceled.',
      'any.required': 'O status é um campo obrigatório.',
    }),
  userId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'O ID do usuário deve ser um número.',
      'number.integer': 'O ID do usuário deve ser um número inteiro.',
      'number.positive': 'O ID do usuário deve ser um valor positivo.',
      'any.required': 'O ID do usuário é um campo obrigatório.',
    }),
  couponId: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .messages({
      'number.base': 'O ID do cupom deve ser um número.',
      'number.integer': 'O ID do cupom deve ser um número inteiro.',
      'number.positive': 'O ID do cupom deve ser um valor positivo.',
    }),
  products: Joi.array()
    .items(
      Joi.object<ProductOnOrderInput>({
        productId: Joi.number()
          .integer()
          .positive()
          .required()
          .messages({
            'number.base': 'O ID do produto deve ser um número.',
            'number.integer': 'O ID do produto deve ser um número inteiro.',
            'number.positive': 'O ID do produto deve ser um valor positivo.',
            'any.required': 'O ID do produto é um campo obrigatório.',
          }),
        quantity: Joi.number()
          .integer()
          .positive()
          .required()
          .messages({
            'number.base': 'A quantidade deve ser um número.',
            'number.integer': 'A quantidade deve ser um número inteiro.',
            'number.positive': 'A quantidade deve ser um valor positivo.',
            'any.required': 'A quantidade é um campo obrigatório.',
          }),
      })
    )
    .required()
    .messages({
      'array.base': 'Os produtos devem ser uma lista.',
      'any.required': 'Os produtos são um campo obrigatório.',
    }),
});

// Exportando o esquema para uso em outros arquivos
export { orderSchema };
