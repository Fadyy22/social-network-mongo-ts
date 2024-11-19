import jwt from 'jsonwebtoken';

const createToken = (payload: string) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export default createToken;
