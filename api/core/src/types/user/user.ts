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

export { userOutput, userInput }