import asyncHandler from 'express-async-handler';

import createToken from '../utils/createToken';
import prisma from '../prisma';

export const signup = asyncHandler(async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });

  const token = createToken(user.id);

  res.status(201).json({ user, token });
});

export const login = asyncHandler(async (req, res) => {
  const token = createToken(req.user!.id);
  res.status(200).json({ user: req.user, token });
});
