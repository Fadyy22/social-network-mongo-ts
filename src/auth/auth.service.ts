import asyncHandler from 'express-async-handler';

import { compare } from 'bcryptjs';
import createToken from '../utils/createToken';
import { ConflictException, UnauthorizedException } from '../exceptions';
import User from '../users/user.model';

export const signup = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) throw new ConflictException('Email already exists');

  const user = await User.create(req.body);

  const token = createToken(user.id);
  res.status(201).json({ status: 'success', data: { user, token } });
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await compare(req.body.password, user.password)))
    throw new UnauthorizedException('Invalid email or password');

  const token = createToken(user.id);
  res.status(200).json({ status: 'success', data: { user, token } });
});
