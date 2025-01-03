import asyncHandler from 'express-async-handler';

import { ConflictException, NotFoundException } from '../../common/exceptions';
import Post from '../posts/post.model';
import Like from './like.model';

export const likePost = asyncHandler(async (req, res) => {
  const like = await Like.findOne({
    userId: req.user!._id,
    postId: req.params.id,
  });
  if (like) throw new ConflictException('Already liked');

  await Like.create({
    userId: req.user!._id,
    postId: req.params.id,
  });

  await Post.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { likesCount: 1 },
    },
    { new: true }
  );

  res.status(201).json({ status: 'success' });
});

export const unlikePost = asyncHandler(async (req, res) => {
  const like = await Like.deleteOne({
    userId: req.user!._id,
    postId: req.params.id,
  });
  if (!like.deletedCount) throw new NotFoundException('Not liked yet');

  await Post.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { likesCount: -1 },
    },
    { new: true }
  );

  res.status(204).end();
});
