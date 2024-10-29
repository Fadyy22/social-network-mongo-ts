import asyncHandler from 'express-async-handler';

import { ForbiddenException, NotFoundException } from '../exceptions';
import Post from './post.model';

export const createPost = asyncHandler(async (req, res) => {
  req.body.author = req.user!.id;
  const post = await Post.create(req.body);

  res.status(201).json({ status: 'success', data: { post } });
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate('author', '_id firstName lastName profileImg')
    .sort({ createdAt: -1 });

  // posts.forEach((post: Record<string, any>) => {
  //   post.isLiked = post.likes.some(
  //     (like: { userId: string }) => like.userId === req.user!.id
  //   );
  //   delete post.likes;
  // });
  res.status(200).json({ status: 'success', data: { posts } });
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', '_id firstName lastName profileImg')
    .populate({
      path: 'comments',

      // path: 'user' below is the virtual in Comment Schema
      populate: { path: 'user', select: '-_id firstName lastName profileImg' },
    });

  if (!post) throw new NotFoundException('Post not found');

  // post.isLiked = post.likes.some(
  //   (like: { userId: string })  => like.userId === req.user!.id
  // );
  // delete post.likes;

  res.status(200).json({ status: 'success', data: { post } });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    'author',
    'id firstName lastName profileImg'
  );

  if (!post) throw new NotFoundException('Post not found');
  if (post.author.toString() !== req.user!._id.toString())
    throw new ForbiddenException();

  post.content = req.body.content;
  await post.save();

  res.status(200).json({ status: 'success', data: { post } });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).select('author');

  if (!post) throw new NotFoundException('Post not found');
  if (post.author.toString() !== req.user!.id.toString())
    throw new ForbiddenException();

  await Post.findByIdAndDelete(req.params.id);

  res.status(204).end();
});
