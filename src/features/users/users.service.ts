import fs from 'fs/promises';

import asyncHandler from 'express-async-handler';
import cloudinary from '../../common/utils/cloudinary';
import { Types } from 'mongoose';

import {
  BadRequestException,
  NotFoundException,
  HttpException,
} from '../../common/exceptions';
import Like from '../likes/like.model';
import User from './user.model';

const uploadProfileImage = async (image: Express.Multer.File) => {
  const { secure_url } = await cloudinary.uploader.upload(image.path);
  fs.unlink(image.path).catch((err) => console.log(err));
  return secure_url;
};

export const createProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new BadRequestException('Please upload an image');
  }

  let imageUrl;
  try {
    imageUrl = await uploadProfileImage(req.file);
  } catch (error) {
    throw new HttpException('Error uploading image', 500);
  }

  const user = await User.findByIdAndUpdate(
    req.user!._id,
    {
      profileImg: imageUrl,
    },
    { new: true }
  );

  res.status(200).json({ status: 'success', data: { user } });
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const myLikes = await Like.find({ userId: req.user!._id });
  // const user = await User.findById(req.user!.id)
  //   .select('-password -sentRequests -friendRequests')
  //   .populate({ path: 'posts', options: { sort: { createdAt: -1 } } });
  const user = await User.aggregate([
    {
      $match: { _id: new Types.ObjectId(req.user!._id) },
    },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'author',
        as: 'posts',
        pipeline: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $addFields: {
              isLiked: {
                $in: [
                  '$_id',
                  { $map: { input: myLikes, as: 'like', in: '$$like.postId' } },
                ],
              },
            },
          },
        ],
      },
    },
  ]);

  res.status(200).json({ status: 'success', data: { user } });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user!._id, req.body, {
    new: true,
  });

  res.status(200).json({ status: 'success', data: { user } });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const userLikes = await Like.find({ userId: req.params._id });
  const user = await User.aggregate([
    { $match: { _id: new Types.ObjectId(req.params.id) } },
    {
      $addFields: {
        isFriend: {
          $in: [req.user!._id, { $ifNull: ['$friends', []] }],
        },
        sentRequest: {
          $in: [req.user!._id, { $ifNull: ['$friendRequests', []] }],
        },
        receivedRequest: {
          $in: [req.user!._id, { $ifNull: ['$sentRequests', []] }],
        },
      },
    },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'author',
        as: 'posts',
        pipeline: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $addFields: {
              isLiked: {
                $in: [
                  '$_id',
                  {
                    $map: { input: userLikes, as: 'like', in: '$$like.postId' },
                  },
                ],
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        password: 0,
        email: 0,
        sentRequests: 0,
        friendRequests: 0,
        friends: 0,
      },
    },
  ]);
  if (!user) throw new NotFoundException('User not found');

  res.status(200).json({ status: 'success', data: { user } });
});

export const getFriendRequests = asyncHandler(async (req, res) => {
  const friendRequests = await User.findById(req.user!._id)
    .select('friendRequests')
    .populate({
      path: 'friendRequests',
      select: '_id firstName lastName profileImg',
    });

  res.status(200).json({
    status: 'success',
    data: { friendRequests: friendRequests!.friendRequests },
  });
});
