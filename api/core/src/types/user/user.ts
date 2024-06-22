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

interface UserOutputLogin {
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
export { userOutput, userInput, ScopeValidationUser, UserOutputLogin }