import asyncHandler from 'express-async-handler';

import { NotFoundException } from '../exceptions';
import Post from '../posts/post.model';
import Like from './like.model';

export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).select('_id likesCount');
  if (!post) throw new NotFoundException('Post not found');

  await Like.create({
    userId: req.user!._id,
    postId: req.params.id,
  });

  post.likesCount++;
  await post.save();

  res.status(201).json({ status: 'success' });
});

export const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).select('_id likesCount');
  if (!post) throw new NotFoundException('Post not found');

  await Like.deleteOne({
    userId: req.user!._id,
    postId: req.params.id,
  });

  post.likesCount--;
  await post.save();

  res.status(204).end();
});
