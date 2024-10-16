import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { UnauthorizedException } from '../exceptions';

const prisma = new PrismaClient();

const isAuth = asyncHandler(async (req, res, next) => {
  let decodedToken;

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new UnauthorizedException());
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as jwt.JwtPayload;
  } catch (error) {
    return next(new UnauthorizedException('Invalid token'));
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  });

  if (user) {
    req.user = user;
    next();
  } else {
    next(
      new UnauthorizedException(
        'The user who belongs to this token does no longer exist'
      )
    );
  }
});

export default isAuth;
