import asyncHandler from 'express-async-handler';

import { ForbiddenException, NotFoundException } from '../exceptions';
import Post from '../posts/post.model';
import Comment from './comment.model';

export const createComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId).select(
    '_id commentsCount'
  );
  if (!post) throw new NotFoundException('Post not found');

  const comment = await Comment.create({
    userId: req.user!._id,
    postId: req.params.postId,
    content: req.body.content,
  });

  post.commentsCount++;
  await post.save();

  res.status(201).json({ status: 'success', data: { comment } });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId).select(
    '_id commentsCount'
  );
  if (!post) throw new NotFoundException('Post not found');

  const comment = await Comment.findById(req.params.id).select('userId');
  if (!comment) throw new NotFoundException('Comment not found');

  if (comment.userId.toString() !== req.user!.id.toString())
    throw new ForbiddenException();

  await Comment.findByIdAndDelete(req.params.id);

  post.commentsCount--;
  await post.save();

  res.status(204).end();
});
