import asyncHandler from 'express-async-handler';

import { NotFoundException } from '../exceptions';
import prisma from '../prisma';

export const likePost = asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    select: { id: true },
  });
  if (!post) throw new NotFoundException('Post not found');

  await prisma.like.create({
    data: {
      userId: req.user!.id,
      postId: req.params.id,
    },
  });

  await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: {
      likesCount: {
        increment: 1,
      },
    },
  });

  res.status(201).json({ status: 'success' });
});

export const unlikePost = asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    select: { id: true },
  });
  if (!post) throw new NotFoundException('Post not found');

  await prisma.like.delete({
    where: {
      postId_userId: {
        postId: req.params.id,
        userId: req.user!.id,
      },
    },
  });

  await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: {
      likesCount: {
        decrement: 1,
      },
    },
  });

  res.status(204).end();
});
