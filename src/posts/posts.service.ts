import asyncHandler from 'express-async-handler';

import { ForbiddenException, NotFoundException } from '../exceptions';
import prisma from '../prisma';

export const createPost = asyncHandler(async (req, res) => {
  req.body.authorId = req.user!.id;
  const post = await prisma.post.create({
    data: req.body,
  });

  res.status(201).json({ status: 'success', data: { post } });
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts: Record<string, any> = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profile_img: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  posts.forEach((post: Record<string, any>) => {
    post.isLiked = post.likes.some(
      (like: { userId: string }) => like.userId === req.user!.id
    );
    delete post.likes;
  });

  res.status(200).json({ status: 'success', data: { posts } });
});

export const getPost = asyncHandler(async (req, res) => {
  const post: Record<string, any> | null = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profile_img: true,
        },
      },
      comments: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profile_img: true,
            },
          },
          content: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!post) throw new NotFoundException('Post not found');

  post.isLiked = post.likes.some(
    (like: { userId: string }) => like.userId === req.user!.id
  );
  delete post.likes;

  res.status(200).json({ status: 'success', data: { post } });
});

export const updatePost = asyncHandler(async (req, res) => {
  const postExists = await prisma.post.findUnique({
    where: { id: req.params.id },
    select: { id: true },
  });

  if (!postExists) throw new NotFoundException('Post not found');

  const post: Record<string, any> = await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
    include: {
      author: {
        select: {
          id: true,
          profile_img: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  res.status(200).json({ status: 'success', data: { post } });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    select: { authorId: true },
  });
  if (!post) throw new NotFoundException('Post not found');

  if (post.authorId !== req.user!.id) throw new ForbiddenException();

  await prisma.post.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});
