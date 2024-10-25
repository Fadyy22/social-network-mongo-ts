import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { UnauthorizedException } from '../exceptions';
import User from '../users/user.model';

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

  const user = await User.findById(decodedToken.userId);

  if (!user) {
    return next(
      new UnauthorizedException(
        'The user who belongs to this token does no longer exist'
      )
    );
  }

  req.user = user;
  next();
});

export default isAuth;
