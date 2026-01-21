import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwtSecret as string, {
    expiresIn: config.jwtExpire,
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtSecret as string);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
