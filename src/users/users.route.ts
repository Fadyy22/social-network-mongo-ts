import { Router } from 'express';

import {
  parseProfileImage,
  createProfileImage,
  getUserProfile,
  addFriend,
  acceptFriendRequest,
} from './users.service';

import {
  addFriendValidator,
  acceptFriendRequestValidator,
} from './users.validator';

import isAuth from '../middlewares/auth.middleware';

const router = Router();

router.patch('/profile-img', isAuth, parseProfileImage, createProfileImage);

router.route('/:id').get(isAuth, getUserProfile);

router.post('/:id/add', isAuth, addFriendValidator, addFriend);
router.post(
  '/:id/accept',
  isAuth,
  acceptFriendRequestValidator,
  acceptFriendRequest
);

export default router;
