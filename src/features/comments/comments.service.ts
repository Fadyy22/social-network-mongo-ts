import asyncHandler from 'express-async-handler';

import { ForbiddenException, NotFoundException } from '../../common/exceptions';
import Post from '../posts/post.model';
import Comment from './comment.model';

export const createComment = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.postId, {
    $inc: { commentsCount: 1 },
  });
  if (!post) throw new NotFoundException('Post not found');

  const comment = await Comment.create({
    userId: req.user!._id,
    postId: req.params.postId,
    content: req.body.content,
  });

  res.status(201).json({ status: 'success', data: { comment } });
});

export const updateComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId).select('_id').lean();
  if (!post) throw new NotFoundException('Post not found');

  const comment = await Comment.findById(req.params.id).select(
    'userId content'
  );
  if (!comment) throw new NotFoundException('Comment not found');

  if (comment.userId.toString() !== req.user!.id.toString())
    throw new ForbiddenException();

  comment.content = req.body.content;
  await comment.save();

  res.status(201).json({ status: 'success', data: { comment } });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
    .select('userId postId')
    .lean();
  if (!comment) throw new NotFoundException('Comment not found');

  const post = await Post.findById(req.params.postId).select('userId').lean();
  if (!post) throw new NotFoundException('Post not found');

  if (
    comment.userId.toString() !== req.user!.id.toString() &&
    post.author.toString() !== req.user!.id.toString()
  )
    throw new ForbiddenException();

  await Comment.findByIdAndDelete(req.params.id);

  await Post.findByIdAndUpdate(req.params.postId, {
    $inc: { commentsCount: -1 },
  });

  res.status(204).end();
});
