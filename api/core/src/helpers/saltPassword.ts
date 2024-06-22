import {  compare, genSaltSync, hashSync } from "bcryptjs"


export const hashPassword = (password: string): string => {
  const salt = genSaltSync(10)
  const hashedPassword = hashSync(password, salt)
  return hashedPassword
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await compare(password, hashedPassword)
  return isMatch
}