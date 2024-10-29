import fs from 'fs/promises';

import asyncHandler from 'express-async-handler';
import cloudinary from '../utils/cloudinary';

import {
  BadRequestException,
  NotFoundException,
  HttpException,
} from '../exceptions';
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
  const user = await User.findById(req.user!.id)
    .select('-password -sentRequests -friendRequests')
    .populate({ path: 'posts', options: { sort: { createdAt: -1 } } });

  res.status(200).json({ status: 'success', data: { user } });
});

export const addFriend = asyncHandler(async (req, res) => {
  const friend = await User.findByIdAndUpdate(req.params.id, {
    $push: { friendRequests: req.user!._id },
  });
  if (!friend) throw new NotFoundException('User not found');

  await User.findByIdAndUpdate(req.user!.id, {
    $push: { sentRequests: friend._id },
  });

  res.status(201).json({ message: 'success' });
});

export const acceptFriendRequest = asyncHandler(async (req, res) => {
  const friend = await User.findByIdAndUpdate(req.params.id, {
    $pull: { sentRequests: req.user!._id },
    $push: { friends: req.user!._id },
  });
  if (!friend) throw new NotFoundException('User not found');

  await User.findByIdAndUpdate(req.user!.id, {
    $pull: { friendRequests: friend._id },
    $push: { friends: friend._id },
  });

  res.status(201).json({ message: 'success' });
});
