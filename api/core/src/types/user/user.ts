import { Address } from "../address/address"

interface userOutput {
  id: number
  name: string
  lastname: string
  email: string
  password: string
  phone: string
  cpforcnpj: string
}


interface userInput {
  name: string
  lastname: string
  email: string
  password: string
  phone: string
  cpforcnpj: string
}


interface userInputWithAddres {
  name: string
  lastname: string
  email: string
  password: string
  phone: string
  cpforcnpj: string
  address:Address
}


interface UserOutputLogin {
  id: number
  name: string
  email: string
  lastname: string
  phone: string
  password: string
}


interface ScopeValidationUser {
  email: string
  cpforcnpj: string
  phone: string
}
export { userOutput, userInput, ScopeValidationUser, UserOutputLogin, userInputWithAddres }