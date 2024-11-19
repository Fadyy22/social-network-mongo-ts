import asyncHandler from 'express-async-handler';

import { ForbiddenException, NotFoundException } from '../../common/exceptions';
import Post from './post.model';
import Like from '../likes/like.model';

export const createPost = asyncHandler(async (req, res) => {
  req.body.author = req.user!.id;
  const post = await Post.create(req.body);

  res.status(201).json({ status: 'success', data: { post } });
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const myLikes = await Like.find({ userId: req.user!._id });
  const posts = await Post.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
        pipeline: [
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              profileImg: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        author: { $arrayElemAt: ['$author', 0] },
        isLiked: {
          $in: [
            '$_id',
            { $map: { input: myLikes, as: 'like', in: '$$like.postId' } },
          ],
        },
      },
    },
  ]);
  // const posts = await Post.find()
  //   .lean()
  //   .populate('author', '_id firstName lastName profileImg')
  //   .sort({ createdAt: -1 });

  // const userLikes = await Like.find({ userId: req.user!._id })
  //   .select('-_id postId')
  //   .lean();

  // const likedPostIds = userLikes.map((like) => like.postId.toString());

  // const postsWithLikes = posts.map((post) => ({
  //   ...post,
  //   isLiked: likedPostIds.includes(post._id.toString()),
  // }));

  res.status(200).json({ status: 'success', data: { posts } });
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .lean()
    .populate('author', '_id firstName lastName profileImg')
    .populate({
      path: 'comments',

      // path: 'user' below is the virtual in Comment Schema
      populate: { path: 'user', select: '-_id firstName lastName profileImg' },
    });

  if (!post) throw new NotFoundException('Post not found');

  const isLiked = await Like.findOne({
    postId: post._id,
    userId: req.user!._id,
  });

  res.status(200).json({
    status: 'success',
    data: { post: { ...post, isLiked: !!isLiked } },
  });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    'author',
    'firstName lastName profileImg'
  );

  if (!post) throw new NotFoundException('Post not found');
  if (post.author.id.toString() !== req.user!._id.toString())
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
