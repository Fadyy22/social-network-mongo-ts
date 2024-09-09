import { Router } from 'express';

import {
  parseProfileImage,
  createProfileImage,
  getUserProfile,
  addFriend,
  acceptFriendRequest,
} from '../controllers/userController';

import {
  addFriendValidator,
  acceptFriendRequestValidator,
} from '../utils/validators/userValidator';

import isAuth from '../middlewares/authMiddleware';

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
