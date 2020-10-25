import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/secrets';

export const signPayload = (payload: { [key: string]: any }): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });
};
