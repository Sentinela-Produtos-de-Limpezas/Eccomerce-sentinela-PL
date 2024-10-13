import * as Joi from 'joi';
import { userInput, userInputWithAddres } from "@/types/user/user";

const userSchema = Joi.object<userInput>({
  name: Joi.string().required().messages({
    "any.required": "Por favor, informe o nome!",
  }),
  lastname: Joi.string().required().messages({
    "any.required": "Por favor, informe o sobrenome!",
  }),
  email: Joi.string().email().required().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).messages({
    'email.email': 'Por favor, informe um email válido',
    'required': 'Por favor, informe o email'
  }),

  password: Joi.string().required().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).messages({
    'password.regex': 'Por favor, informe uma senha válida (8 ou mais caracteres, incluindo letras maiúsculas, minúsculas, números)'
  }),

  cpforcnpj: Joi.string().required().when('type', {
    is: 'cpf',
    then: Joi.string().length(11).regex(/^[0-9]{11}$/)

  }).when('type', {
    is: 'cnpj',
    then: Joi.string().length(14).regex(/^[0-9]{14}$/)
  }).messages({
    'required': 'Por favor, informe seu CPF/CNPJ'
  }),
  phone: Joi.string().required().regex(/^[0-9]{11}$/).messages({
    'phone.regex': 'Por favor, informe um número válido de telefone (11 dígitos)',
    'phone.required': 'Por favor, informe seu número de telefone'
  }),

});



const userWithAddressSchema = Joi.object<userInputWithAddres>({
  name: Joi.string().required().messages({
    "any.required": "Por favor, informe o nome!",
  }),
  lastname: Joi.string().required().messages({
    "any.required": "Por favor, informe o sobrenome!",
  }),
  email: Joi.string().email().required().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).messages({
    'email.email': 'Por favor, informe um email válido',
    'required': 'Por favor, informe o email'
  }),

  password: Joi.string().required().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).messages({
    'string.pattern.base': 'Por favor, informe uma senha válida (8 ou mais caracteres, incluindo letras maiúsculas, minúsculas, números)'
  }),

  cpforcnpj: Joi.string().required().when('type', {
    is: 'cpf',
    then: Joi.string().length(11).regex(/^[0-9]{11}$/)

  }).when('type', {
    is: 'cnpj',
    then: Joi.string().length(14).regex(/^[0-9]{14}$/)
  }).messages({
    'required': 'Por favor, informe seu CPF/CNPJ'
  }),
  phone: Joi.string().required().regex(/^\+\d{1,3}\s\d{2}\s\d{5,6}-\d{4}$/).messages({
    'string.pattern.base': 'Por favor, informe um número válido de telefone (formato: +55 99 999999-9999)'
  }),

  address: Joi.object({
    Street: Joi.string().required().messages({
      "any.required": "Por favor, informe o endereço"
    }),
    Number: Joi.string().required().messages({
      "any.required": "Por favor, informe o número do endereço"
    }),
    City: Joi.string().required().messages({
      "any.required": "Por favor, informe a cidade do endereço"
    }),
    isMain: Joi.boolean().required().messages({
      'any.required': 'Por favor, confirme se este é o endereço principal'
    }),
    zipCode: Joi.string().required().messages({
      "any.required": "Por favor, informe o CEP do endereço"
    })
  })
});

export {
  userSchema,
  userWithAddressSchema
}
