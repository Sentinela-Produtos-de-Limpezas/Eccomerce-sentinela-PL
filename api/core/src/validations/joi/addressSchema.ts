import Joi from 'joi';

export const addressSchema = Joi.object({
  Street: Joi.string().required().messages({
    'string.base': 'A rua deve ser uma string.',
    'string.empty': 'O campo rua não pode estar vazio.',
    'any.required': 'A rua é obrigatória.'
  }),
  Number: Joi.string().required().messages({
    'string.base': 'O número deve ser uma string.',
    'string.empty': 'O campo número não pode estar vazio.',
    'any.required': 'O número é obrigatório.'
  }),
  City: Joi.string().required().messages({
    'string.base': 'A cidade deve ser uma string.',
    'string.empty': 'O campo cidade não pode estar vazio.',
    'any.required': 'A cidade é obrigatória.'
  }),
  isMain: Joi.boolean().required().messages({
    'boolean.base': 'O campo principal deve ser um booleano.',
    'any.required': 'O campo principal é obrigatório.'
  }),
  zipCode: Joi.string().required().messages({
    'string.base': 'O CEP deve ser uma string.',
    'string.empty': 'O campo CEP não pode estar vazio.',
    'any.required': 'O CEP é obrigatório.'
  }),
  UserId: Joi.number().integer().positive().required().messages({
    'number.base': 'O UserId deve ser um número.',
    'number.integer': 'O UserId deve ser um número inteiro.',
    'number.positive': 'O UserId deve ser um número positivo.',
    'any.required': 'O UserId é obrigatório.'
  }),
});
