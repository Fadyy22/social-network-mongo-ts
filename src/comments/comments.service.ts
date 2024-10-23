import asyncHandler from 'express-async-handler';

import { ForbiddenException, NotFoundException } from '../exceptions';
import prisma from '../prisma';

export const createComment = asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.postId },
    select: { id: true },
  });
  if (!post) throw new NotFoundException('Post not found');

  const comment = await prisma.comment.create({
    data: {
      userId: req.user!.id,
      postId: req.params.postId,
      content: req.body.content,
    },
  });

  await prisma.post.update({
    where: {
      id: req.params.postId,
    },
    data: {
      commentsCount: {
        increment: 1,
      },
    },
  });

  res.status(201).json({ status: 'success', data: { comment } });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.postId },
    select: { id: true },
  });
  if (!post) throw new NotFoundException('Post not found');

  const comment = await prisma.comment.findUnique({
    where: { id: req.params.id },
    select: { userId: true },
  });

  if (!comment) throw new NotFoundException('Comment not found');

  if (comment.userId !== req.user!.id) throw new ForbiddenException();

  await prisma.comment.delete({
    where: {
      id: req.params.id,
    },
  });

  await prisma.post.update({
    where: {
      id: req.params.postId,
    },
    data: {
      commentsCount: {
        decrement: 1,
      },
    },
  });

  res.status(204).end();
});
