import asyncHandler from 'express-async-handler';

import { ConflictException, NotFoundException } from '../exceptions';
import Post from '../posts/post.model';
import Like from './like.model';

export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).select('_id likesCount');
  if (!post) throw new NotFoundException('Post not found');

  const like = await Like.findOne({
    userId: req.user!._id,
    postId: req.params.id,
  });
  if (like) throw new ConflictException('Already liked');

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

  const like = await Like.deleteOne({
    userId: req.user!._id,
    postId: req.params.id,
  });
  if (!like.deletedCount) throw new NotFoundException('Not liked yet');

  post.likesCount--;
  await post.save();

  res.status(204).end();
});
