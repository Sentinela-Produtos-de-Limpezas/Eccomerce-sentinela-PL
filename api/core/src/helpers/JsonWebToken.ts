import { UserOutputLogin } from '@/types/user/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const generateToken = (payload: UserOutputLogin) => {
  const { password, ...rest } = payload;
  return jwt.sign(rest, JWT_SECRET, {
    expiresIn: '5h', // Adjust expiration time as needed
    algorithm: 'HS256',
  });
};

export const generateRefreshToken = (payload: UserOutputLogin) => {
  const { password, ...rest } = payload;
  return jwt.sign(rest, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d', 
    algorithm: 'HS256',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const getTokenFromHeader = (authorization: string) => {
  return authorization.split(' ')[1];
};