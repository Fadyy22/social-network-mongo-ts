import { Router } from 'express';

import {
  createProfileImage,
  getMyProfile,
  getUserProfile,
  addFriend,
  acceptFriendRequest,
} from './users.service';

import {
  getUserProfileValidator,
  addFriendValidator,
  acceptFriendRequestValidator,
} from './users.validator';

import { uploadSingleImage } from '../middlewares/uploadImage.middleware';

import isAuth from '../middlewares/auth.middleware';
import methodNotAllowed from '../middlewares/methodNotAllowed.middleware';

const router = Router();

router.patch(
  '/profile-img',
  isAuth,
  uploadSingleImage('profileImg', 'profile_images'),
  createProfileImage
);

router.route('/me').get(isAuth, getMyProfile);
router.route('/:id').get(isAuth, getUserProfileValidator, getUserProfile);
router.post('/:id/add', isAuth, addFriendValidator, addFriend);
router.post(
  '/:id/accept',
  isAuth,
  acceptFriendRequestValidator,
  acceptFriendRequest
);

router.all('*', methodNotAllowed);

export default router;
