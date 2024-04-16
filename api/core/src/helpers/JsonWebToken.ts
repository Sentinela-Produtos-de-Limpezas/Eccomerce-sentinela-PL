import { UserOutputLogin } from '@/types/user/user'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export const generateToken = (payload: UserOutputLogin) => {
  const { password, ...rest } = payload
  return jwt.sign(rest, JWT_SECRET, {
    expiresIn: '60m',
    algorithm: 'HS256',
  })

}


export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}

export const decodeToken = (token: string) => {
  return jwt.decode(token)
}

export const getTokenFromHeader = (authorization: string) => {
  return authorization.split(' ')[1]
}