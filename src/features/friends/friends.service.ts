import asyncHandler from 'express-async-handler';
import User from '../users/user.model';
import { NotFoundException } from '../../common/exceptions';
import { getIO } from '../../sockets/init';

export const addFriend = asyncHandler(async (req, res) => {
  const friend = await User.findByIdAndUpdate(req.params.id, {
    $push: { friendRequests: req.user!._id },
  });
  if (!friend) throw new NotFoundException('User not found');
  const io = getIO();
  io.to(req.params.id).emit('newFriendRequest', req.user);

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

export const cancelFriendRequest = asyncHandler(async (req, res) => {
  const friend = await User.findByIdAndUpdate(req.params.id, {
    $pull: { friendRequests: req.user!._id },
  });
  if (!friend) throw new NotFoundException('User not found');

  await User.findByIdAndUpdate(req.user!.id, {
    $pull: { sentRequests: friend._id },
  });

  res.status(204).end();
});

export const rejectFriendRequest = asyncHandler(async (req, res) => {
  const friend = await User.findByIdAndUpdate(req.params.id, {
    $pull: { sentRequests: req.user!._id },
  });
  if (!friend) throw new NotFoundException('User not found');

  await User.findByIdAndUpdate(req.user!.id, {
    $pull: { friendRequests: friend._id },
  });

  res.status(201).json({ message: 'success' });
});

export const deleteFriend = asyncHandler(async (req, res) => {
  const friend = await User.findByIdAndUpdate(req.params.id, {
    $pull: { friends: req.user!._id },
  });
  if (!friend) throw new NotFoundException('User not found');

  await User.findByIdAndUpdate(req.user!.id, {
    $pull: { friends: friend._id },
  });

  res.status(204).end();
});
