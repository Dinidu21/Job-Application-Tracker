import jwt, { Secret, SignOptions } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const expiresIn = process.env.JWT_EXPIRE || '7d';
  return jwt.sign(payload, (process.env.JWT_SECRET || 'fallback-secret') as Secret, {
    expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as TokenPayload;
};