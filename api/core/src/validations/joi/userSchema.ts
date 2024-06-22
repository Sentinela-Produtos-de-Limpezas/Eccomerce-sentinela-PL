import * as Joi from 'joi';
import { userInput } from "@/types/user/user";

const userSchema = Joi.object<userInput>({
  name: Joi.string().required().error(new Error('Por favor, informe seu nome')),
  lastname: Joi.string().required().error(new Error('Por favor, informe seu sobrenome')),
  email: Joi.string().email().required().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    .error(new Error('Por favor, informe um endereço de e-mail válido')),
  password: Joi.string().required().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .error(new Error('A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra maiúscula, uma letra minúscula e um número')),
  cpforcnpj: Joi.string().required().when('type', {
    is: 'cpf',
    then: Joi.string().length(11).regex(/^[0-9]{11}$/)
      .error(new Error('Por favor, informe um CPF válido (11 dígitos)')),
  }).when('type', {
    is: 'cnpj',
    then: Joi.string().length(14).regex(/^[0-9]{14}$/)
      .error(new Error('Por favor, informe um CNPJ válido (14 dígitos)')),
  }),
  phone: Joi.string().required().regex(/^[0-9]{11}$/)
    .error(new Error('Por favor, informe um número de telefone válido com 11 dígitos')),
});

export {
  userSchema
}